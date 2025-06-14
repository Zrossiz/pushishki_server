import '@tensorflow/tfjs-node';
import { Injectable } from '@nestjs/common';
import { Canvas, Image, ImageData, createCanvas, loadImage } from 'canvas';
import * as faceapi from 'face-api.js';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { join } from 'path';
import { sendImage } from 'src/shared/api';
const baseDir = process.cwd();

faceapi.env.monkeyPatch({
    Canvas: Canvas as any,
    Image: Image as any,
    ImageData: ImageData as any,
});

@Injectable()
export class FileGeneratorService {
    private modelsLoaded = false;

    private async loadModels() {
        if (!this.modelsLoaded) {
            const modelPath = join(baseDir, 'models');

            await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
            await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
            this.modelsLoaded = true;
        }
    }

    private async detectFaceAndCrop(imagePath: string): Promise<Canvas> {
        await this.loadModels();
        const img = await loadImage(imagePath);
        const imgWidth = img.width;
        const imgHeight = img.height;

        try {
            const detection = await faceapi.detectSingleFace(img as any);
            if (detection) {
                const box = detection.box;
                const faceCenterX = box.x + box.width / 2;
                const faceCenterY = box.y + box.height / 2;
                const cropSize = Math.max(box.width, box.height) * 2;

                const sx = Math.max(0, faceCenterX - cropSize / 2);
                const sy = Math.max(0, faceCenterY - cropSize / 2);
                const sw = cropSize;
                const sh = cropSize;

                const croppedCanvas = createCanvas(250, 280);
                const ctx = croppedCanvas.getContext('2d');
                ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 250, 280);

                return croppedCanvas;
            }
        } catch (err) {
            console.warn('Ошибка при распознавании лица:', err);
        }


        const defaultCropWidth = Math.min(imgWidth, imgHeight);
        const sx = (imgWidth - defaultCropWidth) / 2;
        const sy = (imgHeight - defaultCropWidth) / 2;

        const croppedCanvas = createCanvas(250, 280);
        const ctx = croppedCanvas.getContext('2d');
        ctx.drawImage(img, sx, sy, defaultCropWidth, defaultCropWidth, 0, 0, 250, 280);

        console.warn('Лицо не найдено, обрезка по центру изображения');

        return croppedCanvas;
    }

    async createDriverLicense(payload: CreateDriverLicenseDto) {
        try {
            const background = await loadImage(join(baseDir, 'assets', "template.jpg"));
            const faceCanvas = await this.detectFaceAndCrop(join(baseDir, payload.filePath));

            const outputCanvas = createCanvas(800, 600);
            const ctx = outputCanvas.getContext('2d');

            ctx.drawImage(background, 0, 0, outputCanvas.width, outputCanvas.height);
            ctx.drawImage(faceCanvas, 80, 170, 250, 280);

            ctx.font = 'normal 26px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(payload.surname, 480, 192);
            ctx.fillText(payload.name, 425, 247);
            ctx.fillText(payload.birthDate, 542, 296);
            ctx.fillText(payload.city, 446, 350);
            ctx.fillText(`${payload.surname} ${payload.name}`, 80, 500);

            const stream = outputCanvas.createPNGStream();

            const result = await sendImage(stream);

            return {
                url: result
            };
        } catch (err) {
            console.error("Ошибка при создании прав:", err);
        }
    }

    async createVehicleNumber() {

    }
}

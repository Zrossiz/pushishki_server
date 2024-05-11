import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { CreateNotifyDto } from './dto/create-notify.dto';

@Injectable()
export class NotifyServiceService {

    async notifyMember(dto: CreateNotifyDto): Promise<{ message: string }> {
        try {
            const headers = {
                'Authorization': `Bearer ${process.env.MTS_API_KEY}`
            };
    
            const body = {
                number: "79674378019",
                destination: dto.destination,
                text: dto.text,
            };
    
            await axios.post('https://api.exolve.ru/messaging/v1/SendSMS', body, {
                headers
            });

            return {
                message: 'sended'
            }
        } catch (err) {
            if (`${err.status}`.startsWith('4')) {
                throw new BadRequestException(err.message);
            }
            console.log(err);
            throw new InternalServerErrorException('Ошибка сервера');
        }
    }
}

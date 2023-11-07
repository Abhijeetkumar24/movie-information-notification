import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';
import { AddMovieRequest, AddMovieResponse } from 'src/interface/notification.interface';

@Controller('notification')
export class NotificationController {

    @GrpcMethod('NotificationService', 'AddMovie')
    findOne(data: AddMovieRequest, metadata: Metadata, call: ServerUnaryCall<any, any>): AddMovieResponse {
        console.log("hii notifiaction")
        const items = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Doe' },
        ];
        // return items.find(({ id }) => id === data.id);
        return { msg: data.msg, status: 'success' };
    }

    @MessagePattern('math.sum.sync.kafka.message')
    mathSumSyncKafkaMessage(data: any) {
        console.log("data: ", data)
        // return (data.value.numbers || []).reduce((a, b) => a + b);
        return "hii baby"
    }

}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from 'db/data-source';
import configuration from './share/config/configuration';
@Module({
  imports: [
    // TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
   
    ConfigModule.forRoot() ,

  ],
  controllers: [AppController],
  providers: [
    AppService,
  ]

})
export class AppModule {}
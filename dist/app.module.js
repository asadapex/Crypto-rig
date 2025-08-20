"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const store_module_1 = require("./store/store.module");
const mining_module_1 = require("./mining/mining.module");
const schedule_1 = require("@nestjs/schedule");
const videocard_module_1 = require("./videocard/videocard.module");
const users_module_1 = require("./users/users.module");
const multer_module_1 = require("./multer/multer.module");
const adminauth_module_1 = require("./adminauth/adminauth.module");
const reports_module_1 = require("./reports/reports.module");
const stats_module_1 = require("./stats/stats.module");
const notification_module_1 = require("./notification/notification.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            store_module_1.StoreModule,
            mining_module_1.MiningModule,
            schedule_1.ScheduleModule.forRoot(),
            videocard_module_1.VideocardModule,
            users_module_1.UsersModule,
            multer_module_1.MulterModule,
            adminauth_module_1.AdminauthModule,
            reports_module_1.ReportsModule,
            stats_module_1.StatsModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
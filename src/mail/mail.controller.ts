import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import {
  MailApplicationDto,
  MailPartnersDto,
  MailVacationDto,
} from "./mail.dto";
import { MailService } from "./mail.service";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @HttpCode(200)
  @Post("application")
  async sendMailApplication(@Body() dto: MailApplicationDto) {
    return this.mailService.mailApplication(dto);
  }

  @HttpCode(200)
  @Post("vacation")
  async sendMailVacation(@Body() dto: MailVacationDto) {
    return this.mailService.mailVacation(dto);
  }

  @HttpCode(200)
  @Post("partner")
  async sendMailPartner(@Body() dto: MailPartnersDto) {
    return this.mailService.mailPartner(dto);
  }
}

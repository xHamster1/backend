import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import {
  MailApplicationDto,
  MailPartnersDto,
  MailVacationDto,
} from "./mail.dto";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public mailApplication(dto: MailApplicationDto) {
    const name = dto.products.map(item => item.name);
    const category = dto.products.map(item => item.category.name);
    const subcategory = dto.products.map(item => item.subcategory.name);
    const brand = dto.products.map(item => item.brand.name);

    this.mailerService
      .sendMail({
        from: "ijuststupidmail@mail.ru",
        to: "litry-palitry@mail.ru",
        subject: "Новая заявка",
        html: `
        <h1><i>Имя заказчика: ${dto.name} </i></h1>
        <h1><i>Номер телефона: ${dto.phone} </i></h1>
        <h1><i>E-mail: ${dto.email} </i></h1>
        <h1><i>Желаемый(-е) товар(-ы):</i></h1>
        <h3><i>Наименование товара: </i></h3> ${name}
        <h3><i>Категория: </i></h3>${category}
        <h3><i>Подкатегория: </i></h3>${subcategory}
        <h3><i>Брэнд: </i></h3>${brand}
        <h1><i>Артикул товара: ${
          dto.articul ? dto.articul : "Артикул отсутствует"
        } </i></h1>
      `,
      })
      .then(() => {})
      .catch(() => {});
  }

  public mailVacation(dto: MailVacationDto) {
    this.mailerService
      .sendMail({
        from: "ijuststupidmail@mail.ru",
        to: "litry-palitry@mail.ru",
        subject: "Новый отклик на вакансию",
        html: `
        <h1><i>Имя: ${dto.name} </i></h1>
        <h1><i>Номер телефона: ${dto.phone} </i></h1>
        <h1><i>E-mail: ${dto.email} </i></h1>
        <h1><i>Вакансия, на которую откликнулся: ${
          dto.vacation ? dto.vacation : "Вакансия не выбрана"
        } </i><h1>

        <h1><i>Сообщение: ${dto.message} </i><h1>
      `,
      })
      .then(() => {})
      .catch(() => {});
  }

  public mailPartner(dto: MailPartnersDto) {
    this.mailerService
      .sendMail({
        from: "ijuststupidmail@mail.ru",
        to: "litry-palitry@mail.ru",
        subject: "Новая заявка на партнерство",
        html: `
        <h1><i>Название компании: ${dto.companyName} </i></h1>
        <h1><i>Имя: ${dto.name} </i></h1>
        <h1><i>Номер телефона: ${dto.phone} </i></h1>
        <h1><i>E-mail: ${dto.email} </i></h1>
      `,
      })
      .then(() => {})
      .catch(() => {});
  }
}

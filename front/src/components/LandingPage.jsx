import { Link } from "react-router-dom";
import images_1 from "../images/images_1.svg";
import images_2 from "../images/images_2.svg";
import images_3 from "../images/images_3.png";
import images_4 from "../images/images_4.png";
import { motion } from "framer-motion";



export const LandingPage = () => {
  return (
    <div className="landing">
      <div className="container__landing">
        <section className="result">
          <motion.div
            className="result__text"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            whileInView={{ opacity: 1 }}
          >
            <h1>Узнайте результаты экзаменов</h1>
            <p>
              Для этого вам нужно выбрать муниципалитет, школу, год сдачи
              экзамена и предмет
            </p>
            <Link className="result__button" to="/ballsystem">
              Узнать
            </Link>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={images_1}
            alt=""
            className="result__images"
          />
        </section>
        <section className="works">
          <motion.h1
            className="works__header"
            initial={{ x: -300 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.4 }}
          >
            Как это работает?
          </motion.h1>

          <div
            className="works__container"
            initial={{ x: -300 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="works__item item1"
              initial={{ x: -300 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="works__title">1. Отправка данных</h1>
              <p className="works__text">
                Мы реализуем динамическое Single Page приложение с асинхронной
                бизнес логикой, позволяющее пользователю просматривать
                статистику в режиме реального времени.
              </p>
            </motion.div>

            <motion.div
              className="works__item item2"
              initial={{ x: -300 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="works__title">2. Запрос на получение данных</h1>
              <img src={images_2} alt="" />
              <p className="works__text">
                Сначала пользователю предоставляется выбор всех доступных
                муниципалитетов, в зависимости от которых формируется дальнейший
                набор данных. Уже в зависимости от конкретного запроса (школа,
                год, предмет) составляется список рузультатов экзаменов.
              </p>
            </motion.div>

            <motion.div
              className="works__item item3"
              initial={{ x: 300 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="item3__content">
                <h1 className="works__title">3. Графическое представление</h1>
                <img src={images_3} alt="" />
                <p className="works__text">
                  На основание полученного с сервера списка, создается
                  графическое представление в виде диаграммы, показывающая
                  процентое соотношения успеваемости по предметам и итоговых
                  баллов.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        <motion.section
          className="look"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="look__container">
            <div className="look__context">
              <h1>Посмотрите свои результаты прямо сейчас</h1>
              <div className="look__buttons">
                <button className="look__buttons__btn">
                  Зарегистрироваться
                </button>
                <button className="look__buttons__btn look__buttons__btn-active">
                  Войти
                </button>
              </div>
            </div>

            <img src={images_4} alt="" />
          </div>
        </motion.section>
      </div>
    </div>
  );
};

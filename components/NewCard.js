"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { useFilterContext } from "./FilterContext";
import Checkbox from "./Checkbox";

const NewCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [ava, setAva] = useState("");
  const [theme, setTheme] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [subscribers, setSubscribers] = useState(0);
  const [views, setViews] = useState(0);
  const [cpv, setCpv] = useState(0);
  const [geo, setGeo] = useState("");
  const [type, setType] = useState("группа");
  const [errors, setErrors] = useState({});
  const [shown, setShown] = useState(1);
  const [link, setLink] = useState("");
    const [specialOffer, setSpecialOffer] = useState("");
  const [packageOffer, setPackageOffer] = useState("");

  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);

  const {
    themes,
    lang,
    geos,
    types
  } = useFilterContext();

      const handleSpecialOffersChangeForm = (isChecked) => {
    if (isChecked) {
      setSpecialOffer("1");
    } else {
      setSpecialOffer("");
    }
  };

  const handlePackageOffersChangeForm = (isChecked) => {
    if (isChecked) {
      setPackageOffer("1");
    } else {
      setPackageOffer("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка наличия обязательных полей
    const validationErrors = {};
    if (!channelName) {
      validationErrors.channelName = "Пожалуйста, введите название канала";
    }
    if (!ava) {
      validationErrors.ava = "Пожалуйста, введите URL картинки";
    }
    if (!theme) {
      validationErrors.theme = "Пожалуйста, введите тему канала";
    }
    if (theme === "Введите тему канала") {
      validationErrors.theme = "Пожалуйста, введите тему канала";
    }
    if (!language) {
      validationErrors.language = "Пожалуйста, введите язык канала";
    }
    if (language === "Введите язык канала") {
      validationErrors.language = "Пожалуйста, введите язык канала";
    }
    if (!description) {
      validationErrors.description = "Пожалуйста, введите описание канала";
    }

    if (!geo) {
      validationErrors.geo = "Пожалуйста, выберите геолокацию канала";
    }
    if (!link) {
      validationErrors.link = "Пожалуйста, введите ссылку на канал";
    }
    if (!type) {
      validationErrors.type = "Пожалуйста, выберите тип канала";
    }
    if (geo === "Выберите геолокацию канала") {
      validationErrors.geo = "Пожалуйста, выберите геолокацию канала";
    }

    if (type === "Выберите тип канала") {
      validationErrors.type = "Пожалуйста, выберите тип канала";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      console.log("Send data");
      const res = await fetch("/api/cards/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: ava,
          name: channelName,
          theme: theme,
          language: language,
          description: description,
          subscribers: subscribers,
          views: views,
          is_shown: shown,
          type: type,
          geolocation: geo,
          link: link,
          cpv: cpv,
          is_new: 0,
          special_offer: specialOffer,
          package_offer: packageOffer,
          price_after_discount: priceAfterDiscount,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          // Обработка успешного ответа
          // console.log(result);
        })
        .catch((error) => {
          // Обработка ошибок
          console.error(error);
        });
    }

    setChannelName("");
    setAva("");
    setTheme("");
    setDescription("");
    setLanguage("");
    setLink("");
    setCpv("");
    setSubscribers(0);
    setViews(0);
    setErrors({});
    setSpecialOffer("");
    setPackageOffer("");
    setIsModalOpen(false);
  };

  const handleShow = (event) => {
    event.preventDefault();
    const valueToNum = parseInt(event.target.value);
    setShown(valueToNum);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="card admin-card cursor-pointer text-l text-center border-solid border border-slate-300 rounded-md p-2 mb-2 lg:text-xl hover:bg-slate-200"
        onClick={openModal}
      >
        Добавить новый канал
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          id="buyer-modal-form"
          onSubmit={handleSubmit}
          className="modal-form text-xs"
        >
          <div className="flex">
            <label className="modal-label w-1/2">
              Название:
              <input
                className="modal-input"
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
              {errors.channelName && (
                <span className="error">{errors.channelName}</span>
              )}
            </label>

            <label className="modal-label w-1/2">
              Тип:
              <div className="flex">
                <select
                  className="modal-input w-1/2"
                  onChange={(e) => setType(e.target.value)}
                >
                  {types && types.length > 0
                    ? types.map((item) => (
                        <option key={Math.random()} className="" value={item}>
                          {item}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              {errors.type && <span className="error">{errors.type}</span>}
            </label>
          </div>

          <div className="flex">
            <label className="modal-label w-1/2">
              Аватар:
              <input
                className="modal-input"
                type="text"
                value={ava}
                onChange={(e) => setAva(e.target.value)}
                placeholder="https://..."
              />
              {errors.ava && <span className="error">{errors.ava}</span>}
            </label>

            <label className="modal-label w-1/2">
              Ссылка на канал (группу, бот):
              <input
                className="modal-input"
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://t.me/..."
              />
              {errors.link && <span className="error">{errors.link}</span>}
            </label>
          </div>

          <label className="modal-label">
            Гео:
            <div className="flex">
              <input
                className="modal-input w-1/2"
                value={geo}
                onChange={(e) => setGeo(e.target.value)}
              />
              <select
                className="modal-input w-1/2"
                onChange={(e) => setGeo(e.target.value)}
              >
                <option value="Выберите геолокацию канала">Свой вариант</option>
                {geos && geos.length > 0
                  ? geos.map((item) => (
                      <option key={Math.random()} className="" value={item}>
                        {item}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {errors.geo && <span className="error">{errors.geo}</span>}
          </label>

          <label className="modal-label">
            Тема:
            <div className="flex">
              <input
                className="modal-input w-1/2"
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <select
                className="modal-input w-1/2"
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="Введите тему канала">Свой вариант</option>
                {themes && themes.length > 0
                  ? themes.map((item) => (
                      <option key={item} className="" value={item}>
                        {item}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {errors.theme && <span className="error">{errors.theme}</span>}
          </label>

          <label className="modal-label">
            Язык:
            <div className="flex">
              <input
                className="modal-input w-1/2"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
              <select
                className="modal-input w-1/2"
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="Введите язык канала">Свой вариант</option>
                {lang && lang.length > 0
                  ? lang.map((item) => (
                      <option key={item} className="" value={item}>
                        {item}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {errors.language && (
              <span className="error">{errors.language}</span>
            )}
          </label>
          <div className="flex">
            <label className="modal-label w-1/2">
              Количество просмотров:
              <input
                className="modal-input"
                type="number"
                inputMode="numeric"
                value={views}
                onChange={(e) => setViews(parseInt(e.target.value))}
              ></input>
            </label>
            <label className="modal-label w-1/2">
              Колличество подписчиков:
              <input
                className="modal-input"
                type="number"
                inputMode="numeric"
                value={subscribers}
                onChange={(e) => setSubscribers(parseInt(e.target.value))}
              ></input>
            </label>
          </div>
          <div className="flex mb-1">
            <label className="modal-label w-1/2">
              CPV:
              <input
                className="modal-input"
                type="number"
                inputMode="numeric"
                value={cpv}
                onChange={(e) => setCpv(parseInt(e.target.value))}
              ></input>
            </label>

            <label className="modal-label w-1/2">
              Цена со скидкой:
              <input
                className="modal-input"
                type="number"
                inputMode="numeric"
                value={priceAfterDiscount}
                onChange={(e) =>
                  setPriceAfterDiscount(parseInt(e.target.value))
                }
              ></input>
            </label>
          </div>

          <Checkbox
            id="checkbox-1"
            label="Специальные предложения"
            channel={""}
            onChange={handleSpecialOffersChangeForm}
          />
          <Checkbox
            id="checkbox-2"
            label="Пакетные предложения"
            channel={""}
            onChange={handlePackageOffersChangeForm}
          />

          <label className="modal-label">
            Описание:
            <textarea
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>

          <label className="modal-label">
            <select
              className="modal-input"
              onChange={(event) => handleShow(event)}
            >
              <option value="1">Показать</option>
              <option value="0">Скрыть</option>
            </select>
          </label>

          <button type="submit">Отправить</button>
        </form>
      </Modal>
    </>
  );
};

export default NewCard;

"use client";

import { useFilterContext } from "@components/FilterContext";
import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [channelName, setChannelName] = useState("");
  const [ava, setAva] = useState("");
  const [link, setLink] = useState("");
  const [theme, setTheme] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [subscribers, setSubscribers] = useState(0);
  const [views, setViews] = useState(0);
  const [cpv, setCpv] = useState(0);
  const [geo, setGeo] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [showCheck, setShowCheck] = useState(false);

  const { themes, lang, geos, types } = useFilterContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка наличия обязательных полей
    const validationErrors = {};
    if (!channelName) {
      validationErrors.channelName = "Пожалуйста, введите название канала";
    }
    if (!link) {
      validationErrors.link = "Пожалуйста, введите URL канала";
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
      setShowLoader(true);
      setShowBtn(false);
      const res = await fetch("/api/cards/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: ava,
          link: link,
          name: channelName,
          theme: theme,
          language: language,
          description: description,
          subscribers: subscribers,
          views: views,
          type: type,
          geolocation: geo,
          cpv: cpv,
          is_shown: 0,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          // Обработка успешного ответа
          setShowCheck(true);
          setShowLoader(false);
        })
        .catch((error) => {
          // Обработка ошибок
            console.error(error);
            throw(error)
        });
    }

    setChannelName("");
    setTheme("");
    setDescription("");
    setLanguage("");
    setCpv(0);
    setSubscribers(0);
    setViews(0);
    setAva("")
    setLink("")
    setErrors({});
    };
    
    const handleRefresh = () => {
        setShowBtn(true)
        setShowCheck(false)
    }

  return (
    <div className="container sm:container-md md:container-lg mx-auto p-10">
      <div className="new-form new-channel-form mx-auto">
        <form
          id="buyer-modal-form"
          onSubmit={handleSubmit}
          className="lg:p-15 text-l p-5 "
        >
          <label className="modal-label">
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

           <div className="flex">
            <label className="modal-label w-1/2">
              Аватар:
              <input
                className="modal-input"
                type="text"
                value={ava}
                onChange={(e) => setAva(e.target.value)}
                placeholder="https://.."
              />
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
            Тип канала:
            <div className="flex">
              {/* <input
                className="modal-input"
                value={type}
                onChange={(e) => setType(e.target.value)}
              /> */}
              <select
                className="modal-input "
                onChange={(e) => setType(e.target.value)}
              >
                 <option value="">Выберите тип канала</option>
                {types && types.length > 0
                  ? types.map((item) => (
                      <option key={Math.random()} value={item}>
                        {item}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            {errors.type && <span className="error">{errors.type}</span>}
          </label>
          <label className="modal-label">
            Гео канала:
            <div className="flex">
              <input
                className="modal-input"
                value={geo}
                onChange={(e) => setGeo(e.target.value)}
              />
              <select
                className="modal-input "
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
                className="modal-input"
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
              <select
                className="modal-input "
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
            Язык канала:
            <div className="flex">
              <input
                className="modal-input"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
              <select
                className="modal-input "
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

          <label className="modal-label">
            Количество просмотров:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={views}
              onChange={(e) => setViews(parseInt(e.target.value))}
            ></input>
          </label>
          <label className="modal-label">
            Колличество подписчиков:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={subscribers}
              onChange={(e) => setSubscribers(parseInt(e.target.value))}
            ></input>
          </label>
          <label className="modal-label">
            CPV:
            <input
              className="modal-input"
              type="number"
              inputMode="numeric"
              value={cpv}
              onChange={(e) => setCpv(parseInt(e.target.value))}
            ></input>
          </label>

          <label className="modal-label">
            Описание:
            <textarea
              className="modal-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>

          {showBtn ? <button type="submit">Отправить</button> : null}
          {showLoader ? (
            <div>
              <PulseLoader color="#315EEB" margin={10} />
            </div>
          ) : null}
          {showCheck ? (
            <div>
              <div className="mb-3">✅ Заявка успешно отпралена</div>
              <button className="button-form" onClick={handleRefresh}>Новая заявка</button>
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default page;

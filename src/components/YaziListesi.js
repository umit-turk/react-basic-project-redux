import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yaziListesiGetir } from "../actions";

const YaziListesi = (props) => {
  //useSeloctor ile redux'ın statesine bağlandık.
  //statemizi redux'ın storesi içerisinde tutabiliyoruz.
  const yaziListesi = useSelector(state => state.yaziListesi)//bu fonksiyon stateyi parametre olarak alıyor. daha sonra statenin içinden yazılistesini döndürüyor ve bu döndürdüğü değeri yaziListesi2'ye kaydediyoruz.
  const dispatch = useDispatch();//useDispatch hook'unu çağırıyoruz
  console.log({yaziListesi})

  useEffect(() => { // api den aldığımız değer ile yazı listesini güncelliyoruz

    dispatch(yaziListesiGetir());//Bu fonksyinu burada çağırmamız gerekiyor çünkü bize apiden verileri getiriyor ve redux storeye kaydediyor.

 /*    api()
      .get("/posts")
      .then((response) => {
        setYaziListesi(response.data);
      }); */
  }, []);

  return (
    //apiden aldığımız yazıyı ekrana yazdırıyoruz.
    <div className="ui relaxed divided list">
      <Link to="/yaziekle" className="ui primary button">
        Yazı Ekle
      </Link>
      {yaziListesi.map((yazi) => {
        return (
          <div className="item" key={yazi.id}>
            <i className="large github middle aligned icon"></i>
            <div className="content">
              <Link to={`/posts/${yazi.id}`} className="header">
                {yazi.title}
              </Link>
              <div className="description">{yazi.created_at}</div>
            </div>
          </div>
        );
      })}{" "}
    </div>
  );
};

export default YaziListesi;

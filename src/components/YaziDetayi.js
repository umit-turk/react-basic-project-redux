import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../api";
import YaziYorumlari from "./YaziYorumlari";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import SilModal from "./SilModal";

const YaziDetayi = () => {
  const [yaziDetayi, setYaziDetayi] = useState({});
  const [yorumlar, setYorumlar] = useState([]);

  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  //yorum gönderildiği zaman işleyecek fonksiyonumuz.
  const handleCommentSubmit = (event, yorum) => {
    event.preventDefault();
    api()
      .post(`/posts/${id}/comments`, yorum)
      .then((response) => {
        setYorumlar([...yorumlar, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };



//api all da iki isteğimiz var birincisi yazının detayı ikincisi yorumunu alıyor.
  useEffect(() => {
    axios
      .all([api().get(`/posts/${id}`), api().get(`/posts/${id}/comments`)])
      .then((responses) => {
        setYaziDetayi(responses[0].data);// yazilari bize veriyor
        setYorumlar(responses[1].data); //yorumları veriyor.
      }) 
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (

    // Bu bölümde ise yazının detaylarını gösteriyoruz.
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <div className="ui buttons">
        <Link className="ui blue button" to={`/posts/${yaziDetayi.id}/edit`}>
          Düzenle
        </Link>
        <SilModal yazi={yaziDetayi} push={history.push} />{/* yazıyı silmek istediğimizde açılan modül */}
      </div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari yorumlar={yorumlar} handleSubmit={handleCommentSubmit} />
    </React.Fragment>
  );
};

export default YaziDetayi;

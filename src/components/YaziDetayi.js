import React, { useEffect } from "react";
import YaziYorumlari from "./YaziYorumlari";
import { Link, useParams, useHistory} from "react-router-dom";
import SilModal from "./SilModal";
import { yaziGetir, yorumEkle } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const YaziDetayi = () => {
const yaziDetayi = useSelector(state => state.yaziDetayi);
const dispatch = useDispatch()

  const { id } = useParams();
  const history = useHistory();

  //yorum gönderildiği zaman işleyecek fonksiyonumuz.
  const handleCommentSubmit = (event, yorum) => {
    event.preventDefault();
    dispatch(yorumEkle(id, yorum)) //id useParams dan geliyor yorum ise handleCommentSubmitten
  };


//api all da iki isteğimiz var birincisi yazının detayı ikincisi yorumunu alıyor.
  useEffect(() => {
    dispatch(yaziGetir(id))//id useParams'dan geliyor.yaziGetir fonksiyonunu dispatch ettiğimizde yaziDetayi değeri güncellenecektir.
    
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
        <SilModal yazi={yaziDetayi} />{/* yazıyı silmek istediğimizde açılan modül */}
      </div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari yorumlar={yaziDetayi.yorumlar} handleSubmit={handleCommentSubmit} />
    </React.Fragment>
  );
};

export default YaziDetayi;

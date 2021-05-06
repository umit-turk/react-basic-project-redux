import React, { useState } from "react";

const YORUM_BASLANGIC = {
  display_name: "",
  body: "",
};
//kullanıcı yotumları yazdığında yorumları kaydediğimiz localstate var.
const YorumFormu = (props) => {
  const [yorum, setYorum] = useState(YORUM_BASLANGIC);

//her yorum formuna birşey girildiğinde güncelliyoruz.
  const handleOnChange = (event) => {
    setYorum({ ...yorum, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>
    {/* yorum yaz kısmında bir form oluşturuyoruz, handleSubmit fonk çağırıp yorumu gönderiyoruz ve yorumu yorum başlangıç değeri ile güncelliyoruz(formu gönderdikten sonra temizle) */}
      <h3>Yorum Yaz</h3>
      <form
        className="ui form"
        onSubmit={(event) => {
          props.handleSubmit(event, yorum);
          setYorum(YORUM_BASLANGIC);
        }}
      >
        <div className="ui mini icon input">
          <input
            name="display_name"
            type="text"
            placeholder="Adınız"
            onChange={handleOnChange}
            value={yorum.display_name}
          />
        </div>
        <textarea
          name="body"
          placeholder="Yorumunuz"
          rows="3"
          onChange={handleOnChange}
          value={yorum.body}
        ></textarea>
        <button className="ui blue button" type="submit">
          Yorum Gönder
        </button>
      </form>
    </React.Fragment>
  );
};

export default YorumFormu;

import axios from "axios";
import { api } from "../api";



//burada bir fonksiyon oluşturuyoruz yaziListesiGetir ve bu fonksiyon başka bir fonksiyon döndürüyor döndürdüğü fonksiyon thunk'ın dispatch'ini alıyor
//daha sonra biz içerde yapmak istediğimiz işlemleri yapıyoruz
export const yaziListesiGetir = () => dispatch => {
    api()
    .get("/posts")
    .then((response) => {
        dispatch({type: 'YAZI_LISTESI_GETIR', payload: response.data })                    //then içerisinde yapacağım işlem thunk'ın bize sunduğu dispatc'i kullanarak bir action dispatch etmek
    }).catch(()=> {
        dispatch({type: 'YAZI_LISTESI_GETIR_HATA', payload :'Yazılar yuklenirken hata olustu.'})
    })
}

export  const yaziGetir = (id) => dispatch => {
    axios
    .all([api().get(`/posts/${id}`), api().get(`/posts/${id}/comments`)])
    .then((responses) => { 
        const payload = {
            ...responses[0].data,//yazının içeriği
            yorumlar: responses[1].data//yazının yorumları tek tek bir obje halinde toplanmış hali
        }
      dispatch({type: 'YAZI_GETIR', payload})  //biz bunu reducer'a yollarken yazının içinde bir yorum değeri oluşturup yorum listesini o değerin altına atamak istiyoruz
    }) 
    .catch((error) => {
      dispatch({type: 'YAZI_GETIR_HATA', payload: 'Yazı yuklenırken hata olustu.'})
    });
}


export const yaziDuzenle = (id, yazi, push) => dispatch => {
    api()
        .put(`/posts/${id}`, yazi)
        .then((response) => {
            dispatch({type: "YAZI_DUZENLE", payload: response.data})
        push(`/posts/${id}`);
        })
        .catch((error) => {
          dispatch({ type: "YAZI_DUZENLE_HATA" ,payload: "Başlık ve yazı içeriği alanları zorunludur."});
        });
}


export const yorumEkle = (id, yorum) => dispatch => {
    api()
    .post(`/posts/${id}/comments`, yorum) // Bu kısımda post veritabanına kaydediliyor
    .then((response) => {
        dispatch({type: 'YORUM_EKLE', payload:response.data})
    })
    .catch((error) => {
        dispatch({type: "YORUM_EKLE_HATA", payload:"Yorum eklerken hata oluştu"})
    });
};

export const yaziSil = (id, close, push) => dispatch => {
    api()
      .delete(`/posts/${id}`)
      .then(() => {
          dispatch({type: "YAZI_SIL",payload: id})
        close();
        push(`/`);
      })
      .catch(() => {
        dispatch({ type: "YAZI_SIL_HATA", payload:"Yazıyı silerken hata oluştu"});
      });
}



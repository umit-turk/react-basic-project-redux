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
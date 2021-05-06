const INITIAL_STATE = {
    yaziListesi: [],
    yaziListesiHata: '',
    yaziDetayi: { id: '', title: '', content: '', created_at: '', yorumlar: [] },
    yaziDetayiHata: '',
    yorumEkleHata: '',
    yaziSilHata:'',
    yaziDuzenleHata:'',
};
//EK BİLGİ: HATALARI YAZARKEN TEK BİR MERKEZDEN YÖNETEBİLİRİZ

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) { //actiondan gelen type değerine göre switch stateyi operate ediyoruz.
        case 'YAZI_LISTESI_GETIR':
            return {
                ...state,
                yaziListesi: action.payload,
                yaziDetayiHata:''//ilk denemede bir hata oluşursa yeniden denerken o değerle ilgili bir hatayıda boş bir string olarak güncellemeliyiz.
            };
        case 'YAZI_LISTESI_GETIR_HATA':
            return {
                ...state,
                yaziListesiHata: action.payload
            };
        case 'YAZI_GETIR':
            return {
                ...state,
                yaziDetayi: action.payload,
                yaziDetayiHata:''
            };
        case 'YAZI_GETIR_HATA':
            return {
                ...state,
                yaziDetayiHata: action.payload
            };
        case 'YORUM_EKLE':
            return {
                ...state,
                yaziDetayi: { ...state.yaziDetayi, yorumlar: [...state.yaziDetayi.yorumlar, action.payload], },
                yorumEkleHata:''
            }
        case "YORUM_EKLE_HATA":
            return {
                ...state,yorumEkleHata: action.payload
            }
        case "YAZI_SIL":
            return {...state, yaziListesi: state.yaziListesi.filter(yazi => yazi.id !== action.payload),yaziSilHata:''}
        case "YAZI_SIL_HATA":
            return {...state, yaziSilHata :action.payload}
        case "YAZI_DUZENLE":
            return {
            ...state,
            yaziDetayi: {...state.yaziDetayi, ...action.payload},
            yaziDuzenleHata: ''
        };
        case 'YAZI_DUZENLE_HATA':
            return {
                ...state,
                yaziDuzenleHata: action.payload
            }
        default:
            return state;
    }
};
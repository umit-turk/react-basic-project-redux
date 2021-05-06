const INITIAL_STATE = {
    yaziListesi : [],
    yaziListesiHata: ''
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){ //actiondan gelen type değerine göre switch stateyi operate ediyoruz.
        case 'YAZI_LISTESI_GETIR':
            return{
                ...state,
                yaziListesi: action.payload
            }
        case 'YAZI_LISTESI_GETIR_HATA':
            return{
                ...state,
                yaziListesiHata : action.payload
            }
        default:
            return state;
    }
};
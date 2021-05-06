import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button, Modal } from "semantic-ui-react";
import { yaziSil } from "../actions";
import { api } from "../api";

const SilModal = ({ yazi }) => {
  const [open, setOpen] = useState(false);//bu state değeri modal'ın açılıp açılmamasını ilgilendiriyor.Redux'a taşımaya gerek yok.
  const hata = useSelector(state => state.yaziSilHata) //hatayı da state den almış olduk.
  const show = () => setOpen(true);
  const close = () => setOpen(false);
  const { push } = useHistory()

 const dispatch= useDispatch()

  const handleDelete = (id) => {
    dispatch(yaziSil(id, close, push))
  };

  return (
    <React.Fragment>
      <Button color="red" onClick={show}>
        Sil
      </Button>
      <Modal size="mini" open={open} onClose={close}>
        <Modal.Header>Yazıyı Sil</Modal.Header>
        <Modal.Content>
          <p>
            <b>{yazi.title}</b> başlıklı yazıyı silmek istediğinizden emin
            misiniz?
          </p>
          {hata && <p>{hata}</p>}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close}>
            İptal Et
          </Button>
          <Button
            positive
            icon="delete"
            labelPosition="right"
            content="Evet, Sil!"
            onClick={() => handleDelete(yazi.id)}
          />
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default SilModal;

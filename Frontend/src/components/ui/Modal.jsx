import { useRef } from "react";
import { Button } from "./button";

export function Modal({ title, renderContent, button, onConfirm }) {
  const dialogRef = useRef();

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm(); // dispara submit del form
    }
    // OJO: el cierre final lo hacemos desde saveIncident (cuando sea éxito)
  };

  return (
    <>
      {button && button(openModal)}

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">{title}</h3>

          {renderContent && renderContent({ closeModal })}

          <div className="modal-action">
            <Button variant="primary" onClick={handleConfirm}>
              Guardar
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Modal;
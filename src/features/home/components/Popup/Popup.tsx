
import funnyGif from '../../../../assets/hang-loose-shaka-sign.gif'
interface PopupProps {
  text: string
  onClose: ()=>void;
}

const Popup = ({ text, onClose }: PopupProps) => {
  return (
    <div className="overlay">
      <div className="popup">
        <span className="btn-close" onClick={onClose}>
          &times;
        </span>
        <div>{text}</div>
        <img src={funnyGif}/>
      </div>
    </div>
  );
};

export default Popup;
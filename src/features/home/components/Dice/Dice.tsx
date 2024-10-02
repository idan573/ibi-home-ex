import image1 from '../../../../assets/dice/dice-six-faces-one.png'
import image2 from '../../../../assets/dice/dice-six-faces-two.png'
import image3 from '../../../../assets/dice/dice-six-faces-three.png'
import image4 from '../../../../assets/dice/dice-six-faces-four.png'
import image5 from '../../../../assets/dice/dice-six-faces-five.png'
import image6 from '../../../../assets/dice/dice-six-faces-six.png'

import "./Dice.scss"

interface DiceProps {
  value: number;
}

const Dice: React.FC<DiceProps> = ({value}: DiceProps)=>{
    const chooseDice = (dice: number)=>{
        switch(dice){
            case 1:
                return image1;
            case 2:
                return image2;
            case 3:
                return image3;
            case 4:
                return image4;
            case 5:
                return image5;
            case 6:
                return image6;
            default:
                return image1;
        }
    }
    
    return (<div >
        <img src={chooseDice(value)} className='dice-container'/>
    </div>
  )
}

export default Dice;
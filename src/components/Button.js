import { useContext} from "react"
import { CalcContext } from "../context/CalcContext"

    const getStyleName = btn => {
        const className = {
            '=': 'equals',
            'x': 'opt',
            '-':'opt',
            '+': 'opt',
            '/': 'opt'
        }

        return className[btn]
    }

const Button = ({value}) =>{
    const{calc,setCalc} = useContext(CalcContext);

    //user clicked dot
    const dotClick = () => {
        setCalc({...calc, 
            num: !calc.num.toString().includes('.') ? calc.num+value : calc.num
        });
    }

    //user clicked c
    const resetClick = () => {
       setCalc({sign:'', num:0, res:0});
    }

    //user clicked number
    const handleClickNumber = () => {
        const numberString = value.toString();
        let numberValue;

        if(numberString === '0' && calc.num ===0){
            numberValue=0;
        }else {
            numberValue = Number(calc.num+numberString);
        }

        setCalc({
            ...calc,
            num:numberValue
        });
    }

    //user clicked operation
    const signClick = () => {
       setCalc({
        sign:value,
        res: !calc.res && calc.num ? calc.num : calc.res,
        num: 0
       });
    }

    //user clicked equals
    const equalsClick = () => {
        if(calc.num && calc.res){
            const math = (a,b,sign) => {
                const result = {
                    '+': (a,b) => a+b,
                    '-': (a,b) => a-b,
                    'x': (a,b) => a*b,
                    '/': (a,b) => a/b
                }
                return result[sign](a,b);
            }
            setCalc({
                res:math(calc.res,calc.num, calc.sign),
                num: 0,
                sign: ''
            });
        }
    }

    //user clicked percent
    const percentClick = () => {
        setCalc({
            num:(calc.num/100),
            res: (calc.res/100),
            sign:''
        });
    }

    //user clicked invert button
    const invertClick = () => {
        setCalc({
            num: calc.num ? calc.num*-1 : 0,
            res: calc.res ? calc.res* -1 : 0,
            sign: ''
        });
    }

    const handleBtnclick = () => {
        const results = {
            '.':dotClick,
            'C':resetClick,
            '/':signClick,
            'x':signClick,
            '-':signClick,
            '+':signClick,
            '%':percentClick,
            '=':equalsClick,
            '+-':invertClick
        }

        if(results[value]){
            return results[value]()
        }else {
            return handleClickNumber()
        }
    }

    return (
        <button onClick={handleBtnclick} className={`${getStyleName(value)} button`}>{value}</button>
    )
   
}

export default Button
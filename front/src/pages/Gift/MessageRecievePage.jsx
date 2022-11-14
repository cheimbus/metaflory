import React , {useState, useEffect} from 'react'; 

export default function MessageReceivePage(){

    let [value, setValue] = useState(1);
    useEffect(()=>{
        numberCheck(value)
    },[value])

    const numChange = e =>{
        numberCheck(e.target.value);
    }

    const numberCheck = (v)=>{
        let num = v || 1;
        if(num<0 || num>41){
            return;
        } 
        setValue(num);
    }

    return (
        <>
            <div className="giftpage">
                <div className="giftpage__inner">                
                    <img src={`/img/flower/${value}.png`} alt="" />

                    <p>
                        꽃말. 
                    </p>
                </div>
            </div>



            <div className="button__wrap">
                <input type="number" name="" id="" value={value} onChange={numChange} />
            </div>
        </>
    );

}
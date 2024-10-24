import { stringToColor } from "@helpers/styles";
import { css } from "emotion";

const Gauge = ({ value, name }: { value: number; name: string }) => {
    return (
        <div
            className={css(`
      position: relative;
      width: 200px;
      margin: 0 auto;
      --rotation: ${value * 1.8}deg;
      --color: ${stringToColor(name)};
      border-radius: 50%/100% 100% 0 0;
      --background: #e9ecef;
      overflow: hidden;
      background-color: var(--color, #a22);
      &:before{
      content: "";
      display: block;
      padding-top: 50%; 
    }
      
      `)}
        >
            <div
                className={css(`
          position:  absolute;
          top: -1px;
          left: -1px;
          bottom: 0;
          right: -1px;
          background-color: var(--background, #aaa);
          transform:rotate(var(--rotation)); 
          transform-origin: bottom center; 
          transition-duration: 600;
      `)}
            ></div>
            <div
                className={css(`  position: absolute;
            left: 20%;
            right: 20%;
            bottom: 0;
            top: 40%;
            background-color: #fff;
            border-radius: 50%/100% 100% 0 0;

`)}
            ></div>
            <span
                className={css(`
      
        position:absolute; bottom:0%; left:0;   
          width:100%; 
          text-align: center;
      `)}
            >
                {value}%
            </span>
        </div>
    );
};

export default Gauge;

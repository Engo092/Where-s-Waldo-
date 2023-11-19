import checkCircle from "../assets/svgs/check_circle.svg"

function Checkmark({ x, y }) {
    return (
    <img className='checkCircle' src={checkCircle} alt="" style={{top: y, left: x}} />
    );
}

export default Checkmark;
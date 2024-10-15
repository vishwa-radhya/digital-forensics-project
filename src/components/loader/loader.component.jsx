import './loader.styles.scss';
import PropTypes  from 'prop-types';

const Loader=({loaderWidth,bdColor="black"})=>{
    return(
        <div className="custom-loader" style={{width:loaderWidth,height:loaderWidth,borderTopColor:bdColor}}></div>
    )
}
Loader.propTypes={
    loaderWidth:PropTypes.number,
    bdColor:PropTypes.string,
}
export default Loader;
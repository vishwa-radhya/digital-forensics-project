import './loader.styles.scss';

const Loader=({loaderWidth,bdColor="black"})=>{
    return(
        <div className="custom-loader" style={{width:loaderWidth,height:loaderWidth,borderTopColor:bdColor}}></div>
    )
}
export default Loader;
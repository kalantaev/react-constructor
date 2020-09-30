import React from 'react';
import Canvas, {reOffset, setDeffWidthCanvas} from "../canvas/Canvas";
import {getAllElementsFromServer, getBaseConfigFromServer, publicSettings} from "../agent";
import SelectPage from "./SelectPage";
import {createBasis} from "../custom-shapes/Basis";
import {addImageToMap, clear, getShapes, getShapeById} from "../variable";
import {initTexture} from "../functions";
import {API_ROOT, colorBlack, fon, pol, vagonka} from "../constants";
import {createWall} from "../custom-shapes/Wall";
import {createDoor} from "../custom-shapes/Door";
import {createArrow} from "../custom-shapes/Arrow";
import {POSITION} from "../enums";
import {createWindow} from "../custom-shapes/Window";
import {createPlumbing} from "../custom-shapes/Plumping";
import {createSocket} from "../custom-shapes/Socket";
import {createLight} from "../custom-shapes/Light";

let textureOuter = [];
let textureFloor = [];
let textureInner = [];

class App extends React.Component {

    state = {loading: true, select: true};

    componentDidMount() {
        publicSettings()
            .then(data => {
                let showPrice;
                let titles = {};
                data && data.forEach(item => {
                    if (item.key === 'PUBLIC_SHOW_PRICE') {
                        showPrice = item.value === '1'
                    }
                    titles[item.key] = item.value;
                    titles.PUBLIC_ADD_PLUMBING = 'Добавить сантехнику'
                });
                this.setState({showPrice: showPrice, titles: titles});
            });
        getBaseConfigFromServer()
            .then(rs => {
                this.setState({baseConfigs: rs, loading: false});
            });
        getAllElementsFromServer()
            .then(rs => {
                let windowsSetting = [];
                let doorsSetting = [];
                let electroSetting = [];
                let plumbingSetting = [];
                rs.forEach(el => {
                    this.addImage(el.image3D);
                    this.addImage(el.imageSelect);
                    switch (el.elementType) {
                        case "WINDOW":
                            windowsSetting.push(el);
                            break;
                        case "DOOR":
                            doorsSetting.push(el);
                            break;
                        case "LIGHT":
                        case "SOCKET":
                            electroSetting.push(el);
                            break;
                        case "PLUMPING":
                            plumbingSetting.push(el);
                            break;
                    }
                });
                this.setState({windowsSetting, doorsSetting, electroSetting, plumbingSetting})
            })
    }

    addImage = (id) => {
        if (id) {
            let img = new Image();
            img.src = API_ROOT + "/image/" + id;
            img.crossOrigin = 'Anonymous';
            img.setAttribute('crossorigin', 'anonymous');
            addImageToMap(id, img);
        }
    };
    onSelect = (baseConfig) => {
        let basis = createBasis(0, 0, baseConfig);
        getShapes()
            .filter(item => item.base)
            .forEach(item => {
                item.edit = () => {
                    let type = item.name === 'Window' ? 'selectWindow' : 'selectWindow';
                    this.setState({[type]: true, editShape: item.getId()})
                }
            });
        this.setState({select: false, basis: basis, baseConfig: baseConfig})
    };
    toSelect = () => {
        this.setState({select: true});
        clear();
    };
    initTextures = (baseConfig, isNew, karkas) => {
        if (baseConfig) {
            textureFloor = initTexture(baseConfig.elements, 'TEXTURE_FLOOR', pol, isNew, karkas);
            textureInner = initTexture(baseConfig.elements, 'TEXTURE_INNER', vagonka, isNew, karkas);
            textureOuter = initTexture(baseConfig.elements, 'TEXTURE_OUTER', fon, isNew, karkas);
        }
    };
    createControlBtn = (name, titleKey, onClick) => {
        return <span onClick={onClick} className={'control-btn'}>
            <img className={'canvas-control-btn'}
                 src={'http://37.140.198.217/static/' + name}
                 width={'50px'} height={'40px'}
                 alt={this.state.titles[titleKey]}/>
        </span>
    };
    addWallToBasis = () => {
        createWall(this.state.basis);
    };
    addDoorToBasis = (setting) => {
        if (this.needCreateShape(setting)) {
            createArrow(createDoor(this.state.basis, setting), POSITION.TOP, colorBlack);
        }
        this.setState({selectDoor: false, editShape: null})
    };
    needCreateShape = (setting) => {
        let editShape = this.state.editShape;
        if (editShape) {
            getShapeById(editShape).updateFromSetting(setting);
            return false;
        }
        return true;
    };
    addWindowToBasis = (setting) => {
        if (this.needCreateShape(setting)) {
            createArrow(createWindow(this.state.basis, setting), POSITION.BOTTOM, colorBlack);
        }
        this.setState({selectWindow: false, editShape: null})
    };
    addElectroToBasis = (setting) => {
        setting.elementType === "SOCKET" && createSocket(this.state.basis, setting);
        setting.elementType === "LIGHT" && createLight(this.state.basis, setting);
        this.setState({selectElectro: false})
    };
    addPlumbingToBasis = (setting) => {
        createPlumbing(this.state.basis, setting);
        this.setState({selectPlumbing: false})
    };
    select = (type) => {
        this.setState({[type]: true})
    };
    selectPopUp = (title, data, onClick) => {
        return <div className={'full-screen-background'}>
            <div className={'pop-up'}>
                <h4 className={'align-center'}>{title}</h4>
                {data && data.map(item => {
                    return <span className={'selectable-block'} onClick={() => onClick(item)}>
                        {item.imageSelect &&
                        <img src={API_ROOT + '/image/' + item.imageSelect} className={'img-select'}/>}
                        <div> <b>{item.name}</b></div>
                        {this.state.showPrice && item.price && <div>{item.price + ' руб.'}</div>}
                    </span>
                })}
            </div>
        </div>
    };
    get3DBtnImg = () => {
        return this.state.d3 ? '3d.png' : "2d.png";
    };
    updateView = () => {
        this.setState({d3: !this.state.d3})
    };
    downloadImg = () => {

    };
    sendOrder = () => {

    };

    setFullScreen = () => {
        this.setState({fullScreen: !this.state.fullScreen}, ()=>{
            reOffset();setDeffWidthCanvas();
        })
    };

    render() {
        return <div>
            {!this.state.loading && <div>
                {!this.state.select && <div onClick={this.toSelect} className={'float-left'}>{'<--Назад'}</div>}
                {!this.state.select && <img src={'http://37.140.198.217/static/full-screen.png'}
                                            width={30} onClick={this.setFullScreen} className={'float-right'}/>}
                <h1 className={'align-center'}>{this.state.titles.PUBLIC_APP_TITLE}</h1>
                {this.state.select && <SelectPage titles={this.state.titles}
                                                  baseConfig={this.state.baseConfigs || []}
                                                  showPrice={this.state.showPrice}
                                                  onSelect={this.onSelect}/>}
                {this.renderPopUp()}
                {this.state.d3 && <img src={'http://37.140.198.217/static/full-screen.png'}
                                       width={30} onClick={this.setFullScreen} className={'float-right'}/>}
                {!this.state.select && <div className={this.state.fullScreen && "full-screen"}>
                    {this.renderBtn()}
                    <Canvas view3D = {this.state.d3}/>
                </div>}
            </div>}
        </div>;
    }

    renderPopUp = () => {
        return <div>
            {this.state.selectDoor && this.selectPopUp("Выберете дверь", this.state.doorsSetting.filter(item => !item.inner), this.addDoorToBasis)}
            {this.state.selectWindow && this.selectPopUp("Выберете окно", this.state.windowsSetting, this.addWindowToBasis)}
            {this.state.selectElectro && this.selectPopUp("Выберете электрическую точку", this.state.electroSetting, this.addElectroToBasis)}
            {this.state.selectPlumbing && this.selectPopUp("Выберете сантехнику", this.state.plumbingSetting, this.addPlumbingToBasis)}
        </div>
    };
    renderBtn = () => {
        return <div>
            {this.createControlBtn('partition2.png', 'PUBLIC_ADD_PARTITION', this.addWallToBasis)}
            {this.createControlBtn('door-btn.jpg', 'PUBLIC_ADD_OUTER_DOOR',
                () => this.select('selectDoor'))}
            {this.createControlBtn('window-btn.jpg', 'PUBLIC_ADD_OUTER_WINDOW',
                () => this.select('selectWindow'))}
            {this.createControlBtn('el.png', 'PUBLIC_ADD_ELECTRIC',
                () => this.select('selectElectro'))}
            {this.createControlBtn('plumbing.jpg', 'PUBLIC_ADD_PLUMBING',
                () => this.select('selectPlumbing'))}
            {this.createControlBtn(this.get3DBtnImg(), '', this.updateView)}
            {this.createControlBtn('download.png', '', this.downloadImg)}
            {this.createControlBtn('calculate.png', '', this.sendOrder)}
        </div>
    }
}

export default App;

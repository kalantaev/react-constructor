import React from 'react';
import '../styles.css'

let test = {
    "id": 2222,
    "width": 6000.0,
    "height": 6000.0,
    "price": 8000.00,
    "priority": 1,
    "posted": true,
    "deleted": false,
    "name": "Сложная",
    "colorButtomLine": "#000000",
    "bottomLineHeight": 50.0,
    "elements": [
        {
        "id": 10,
        "elementType": "TEXTURE_INNER",
        "element": {
            "id": 5,
            "elementType": "TEXTURE",
            "price": null,
            "length": 500.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Деревянная вагонка",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 366,
            "image3D": 20
        },
        "position": null,
        "shift": null,
        "def": true,
        "price": null,
        "baseConfig": null
    }, {
        "id": 7,
        "elementType": "TEXTURE_FLOOR",
        "element": {
            "id": 4,
            "elementType": "TEXTURE",
            "price": null,
            "length": 400.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Линолеум темный",
            "inner": true,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 405,
            "image3D": 13
        },
        "position": null,
        "shift": null,
        "def": true,
        "price": null,
        "baseConfig": null
    }, {
        "id": 8,
        "elementType": "WINDOW",
        "element": {
            "id": 2,
            "elementType": "WINDOW",
            "price": 5000.00,
            "length": 800.0,
            "heightPosition": 2100.0,
            "height": 1100.0,
            "image": null,
            "name": "Окно поворотно откидное 800x1100мм",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 66,
            "image3D": 5
        },
        "position": "BOTTOM",
        "shift": 20.0,
        "def": null,
        "price": null,
        "baseConfig": null
    }, {
        "id": 54,
        "elementType": "DOOR",
        "element": {
            "id": 25,
            "elementType": "DOOR",
            "price": 5000.00,
            "length": 800.0,
            "heightPosition": 2000.0,
            "height": 2000.0,
            "image": null,
            "name": "Дверь металическая",
            "inner": false,
            "outer": true,
            "grounding": null,
            "single": null,
            "imageSelect": 299,
            "image3D": 392
        },
        "position": "BOTTOM",
        "shift": 70.0,
        "def": null,
        "price": null,
        "baseConfig": null
    }, {
        "id": 69,
        "elementType": "TEXTURE_FLOOR",
        "element": {
            "id": 21,
            "elementType": "TEXTURE",
            "price": null,
            "length": 399.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Линолеум светлый",
            "inner": true,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 367,
            "image3D": 281
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 0.00,
        "baseConfig": null
    }, {
        "id": 70,
        "elementType": "TEXTURE_FLOOR",
        "element": {
            "id": 13,
            "elementType": "TEXTURE",
            "price": null,
            "length": 500.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Линолеум светлое дерево",
            "inner": true,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 411,
            "image3D": 285
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 0.00,
        "baseConfig": null
    }, {
        "id": 71,
        "elementType": "TEXTURE_INNER",
        "element": {
            "id": 12,
            "elementType": "TEXTURE",
            "price": null,
            "length": 30.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "ПВХ панели",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 374,
            "image3D": 107
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 0.00,
        "baseConfig": null
    }, {
        "id": 72,
        "elementType": "TEXTURE_INNER",
        "element": {
            "id": 22,
            "elementType": "TEXTURE",
            "price": null,
            "length": 50.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "МДФ панель",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 372,
            "image3D": 288
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 6000.00,
        "baseConfig": null
    }, {
        "id": 73,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 11,
            "elementType": "TEXTURE",
            "price": null,
            "length": 150.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил оцинкованный",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 376,
            "image3D": 178
        },
        "position": null,
        "shift": null,
        "def": true,
        "price": null,
        "baseConfig": null
    }, {
        "id": 74,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 6,
            "elementType": "TEXTURE",
            "price": null,
            "length": 30.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил светло-коричневый",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 364,
            "image3D": 30
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 5000.00,
        "baseConfig": null
    }, {
        "id": 75,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 7,
            "elementType": "TEXTURE",
            "price": null,
            "length": 40.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил зеленый",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 353,
            "image3D": 37
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 5000.00,
        "baseConfig": null
    }, {
        "id": 76,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 9,
            "elementType": "TEXTURE",
            "price": null,
            "length": 40.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил синий",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 384,
            "image3D": 78
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 5000.00,
        "baseConfig": null
    }, {
        "id": 77,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 15,
            "elementType": "TEXTURE",
            "price": null,
            "length": 100.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил бежевый",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 380,
            "image3D": 190
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 5000.00,
        "baseConfig": null
    }, {
        "id": 78,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 16,
            "elementType": "TEXTURE",
            "price": null,
            "length": 50.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил белый",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 378,
            "image3D": 200
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 5000.00,
        "baseConfig": null
    }, {
        "id": 79,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 17,
            "elementType": "TEXTURE",
            "price": null,
            "length": 50.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил коричневый",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 382,
            "image3D": 234
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 5000.00,
        "baseConfig": null
    }, {
        "id": 80,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 18,
            "elementType": "TEXTURE",
            "price": null,
            "length": 400.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил \"Дерево\"",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 386,
            "image3D": 241
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 15000.00,
        "baseConfig": null
    }, {
        "id": 81,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 19,
            "elementType": "TEXTURE",
            "price": null,
            "length": 950.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил \"Дерево светлое\"",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 388,
            "image3D": 258
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 15000.00,
        "baseConfig": null
    }, {
        "id": 82,
        "elementType": "TEXTURE_OUTER",
        "element": {
            "id": 20,
            "elementType": "TEXTURE",
            "price": null,
            "length": 250.0,
            "heightPosition": null,
            "height": null,
            "image": null,
            "name": "Профнастил \"Камень\"",
            "inner": false,
            "outer": false,
            "grounding": null,
            "single": null,
            "imageSelect": 390,
            "image3D": 274
        },
        "position": null,
        "shift": null,
        "def": null,
        "price": 15000.00,
        "baseConfig": null
    }],
    "basisWalls": [
        {x:0, y: 0},
        {x:6000, y: 0},
        {x:6000, y: 2400},
        {x:12000, y: 2400},
        {x:12000, y: 6000, doors: [{id:25, shift: 1000}], windows: [{id: 2, shift: 5000}]},
        {x:3600, y: 6000},
        {x:3600, y: 2400, window: {id:2, shift: 1000}},
        {x:0, y: 2400},
        {x:0, y: 0},
        ],
    "walls": [{
        "id": 3,
        "depth": 70.0,
        "price": null,
        "description": "Толщина утеплителя стены и потолка 50мм",
        "def": true,
        "baseConfig": null
    }, {
        "id": 4,
        "depth": 140.0,
        "price": 10000.00,
        "description": "Толщина утеплителя стены и потолка 100мм",
        "def": null,
        "baseConfig": null
    }]
};

class SelectPage extends React.Component {

    state = {};

    render() {
        return <div>
            <h4 className={'align-center'}>{this.props.titles.PUBLIC_SELECT_BASE_TYPE}</h4>
            {this.props.baseConfig.map((item, index) => {
                return <span key={index} onClick={() => this.props.onSelect(item)} className={'selectable-block'}>
                    <h4 className={'select-item'}>{item.name}</h4>
                    {this.props.showPrice && item.price &&
                    <div className={'select-item'}>{'Цена: ' + item.price + ' руб'}</div>}
                </span>
            })}
            <span key={555} onClick={() => this.props.onSelect(test)} className={'selectable-block'}>
                    <h4 className={'select-item'}>{test.name}</h4>
                {this.props.showPrice && test.price &&
                <div className={'select-item'}>{'Цена: ' + test.price + ' руб'}</div>}
                </span>
        </div>;
    }
}

export default SelectPage;

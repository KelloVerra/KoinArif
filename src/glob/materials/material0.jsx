import SubModuleContainer from "../../comps/Material/SubModuleContainer"

import imgdebgu from '/Level.svg';

export default function material0() {
    return {
        id: 0,
        load: 0,
        error: false,
        title: 'Dasar-Dasar Keuangan',
        desc: 'Mempelajari dasar-dasar keunangan',
        category : 'keuangan',
        terms: [
            {
                name: ['uang', ],
                definition: [
                    'alat penukar',
                    'alat tukar',
                    'bentuk fisik dari nilai',
                    'aset',
                    'benda yang dapat ditukarkan dalam bentuk jasa atau barang',
                ],
            },
            {
                name: ['budget', 'penganggaran', ],
                definition: [
                    'pembagian bijak dari uang sesuai kebutuhan',
                    'pengelompokkan nilai yang membatasi pengeluaran',
                ],
            },
        ],
        facts: {
            'true': [
                'budget dapat digunakan sebagai tabungan',
            ],
            'false': [
                'budgeting bermanfaat agar boros pengeluaran',
            ],
        },
        component: _ => {
            return (
                <>
                    <SubModuleContainer id={{material_id:0,submodule_id:0}} minimizedMaxContentCount={3} minimizedHeight={'4rem'}>
                        <h1>Helloo</h1>
                        <p>Lorem</p>
                        <p>Explain</p>
                        <p>Explain</p>
                        <p>Explain</p>
                        <p>Explain</p>
                        <p>Explain</p>
                        <img src={imgdebgu} alt="yaaaaa" width="200px" />
                    </SubModuleContainer>
                    <SubModuleContainer id={{material_id:0,submodule_id:0}} minimizedMaxContentCount={2} minimizedHeight={'2rem'}>
                        <h1>Helloo</h1>
                        <p>Lorem</p>
                        <p>Lorem</p>
                        <p>LoreSSSSSm</p>
                    </SubModuleContainer>
                </>
            )
        },
    }
}
import MiniQuizContainer from "../../comps/Material/MiniQuizContainer";
import SubModuleContainer from "../../comps/Material/SubModuleContainer"

import imgdebgu from '/Level.svg';

export default function material1() {
    return {
        id: 2,
        load: 2,
        error: false,
        title: 'Resiko dan Urgensi',
        desc: 'Membahas mengenai pengelolaan resiko dan situasi urgen maupun darurat.',
        submoduleData: [
            {
                id: 0,
                materialId: 1,
                desc: 'uang',
                terms: [
                    {
                        name: ['uang', 'duit', 'mata uang', 'rupiah', 'uang rupiah', ],
                        definition: [
                            'nilai tukar',
                            'alat penukar',
                            'standar pengukur nilai finansial yang dapat dihitung',
                            'suatu benda yang nilainya diterima oleh semua orang',
                            'benda yang dapat ditukarkan dalam bentuk jasa atau barang',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'uang yang disimpan di bank termasuk uang giral',
                        'uang kartal dikeluarkan oleh negara',
                        'nilai uang diterima oleh banyak orang',
                    ],
                    'false': [
                        'e-money termasuk uang kartal',
                        'uang giral adalah uang yang dikeluarkan oleh negara',
                        'uang hanyalah kertas berisi angka yang tak bermakna',
                    ],
                },
            },
            {
                id: 1,
                materialId: 1,
                desc: 'uang',
                terms: [
                    {
                        name: ['uang', 'duit', 'mata uang', 'rupiah', 'uang rupiah', ],
                        definition: [
                            'nilai tukar',
                            'alat penukar',
                            'standar pengukur nilai finansial yang dapat dihitung',
                            'suatu benda yang nilainya diterima oleh semua orang',
                            'benda yang dapat ditukarkan dalam bentuk jasa atau barang',
                        ],
                    },
                ],
                facts: {
                    'true': [
                        'uang yang disimpan di bank termasuk uang giral',
                        'uang kartal dikeluarkan oleh negara',
                        'nilai uang diterima oleh banyak orang',
                    ],
                    'false': [
                        'e-money termasuk uang kartal',
                        'uang giral adalah uang yang dikeluarkan oleh negara',
                        'uang hanyalah kertas berisi angka yang tak bermakna',
                    ],
                },
            },
        ],
        component: _ => (
            <>
                <SubModuleContainer id={{material_id:2,submodule_id:0}} minimizedMaxContentCount={4} minimizedHeight={'11rem'}>
                    <h1>Resiko</h1>
                    <p>Resiko ialah kemungkinan dari kejadian tidak terduga yang dapat merugikanmu</p>
                    <p>[EXAMPLE] seperti, sakit, kerusakan, kecelakaan, kematian, atau kehilangan aset</p>
                    <img src={imgdebgu} alt="Ilustrasi nilai ukur antara Uang & Barang" width="200px" />
                    <p>Resiko bersifat sulit diprediksi</p>
                    <p>Dampaknya beragam</p>
                    <p>Tidak semua resiko bisa dihindari, namun semua resiko bisa dikelola</p>
                    <p>Salah satu strategi mengelola resiko ialah:</p>
                    <p>- melakukan dana darurat</p>
                    <p>- memanfaatkan asuransi</p>
                    <p>mari bahas tuntas di submodul selanjutnya!</p>
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:2,submodule_id:0}} />
                <SubModuleContainer id={{material_id:2,submodule_id:1}} minimizedMaxContentCount={4} minimizedHeight={'11rem'}>
                    <h1>Dana Darurat</h1>
                    
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:2,submodule_id:1}} />
                <SubModuleContainer id={{material_id:2,submodule_id:2}} minimizedMaxContentCount={4} minimizedHeight={'11rem'}>
                    <h1>Asuransi</h1>
                    
                </SubModuleContainer>
                <MiniQuizContainer id={{material_id:2,submodule_id:2}} />
            </>
        )
    };
}
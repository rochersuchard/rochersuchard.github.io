const date = "8 juillet 2022 (révisé le 3 juillet 2023)";
const source = "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000046029572/2023-07-03";

const traitementsBase = [17745.47, 19406.35, 21483.24, 28408.30, 28430.36, 28448.22];
const traitementTaux = 1.00;

const sujetionBase = 435.18;
const sujetionTaux = 1.00;

const responsabilite4Base = 2122.27;
const responsabiliteTaux = 1.00;

const responsabilite5Base = 4210.77;

const montantGardeSemaine = 154.22;
const montantGardeWE = 168.71;

const logeBase = 336.32;
const logeTaux = 1.0;

const nourriBase = 674.31;
const nourriTaux = 1.0;

const logenourriBase = 1010.64;
const logenourriTaux = 1.0;

const SSTotTauxFrance = 0.0040;
const SSTotTauxAlsace = 0.0170;
const SSTotBase = 1;

const SSPlafTaux = 0.0690;
const SSPlafBase = 1;

const plafondSS = 3666;

const CRDSTaux = 0.005;
const CRDSBase = 0.9825;

const CSGDedTaux = 0.068;
const CSGDedBase = 0.9825;

const CSGNonDedTaux = 0.024;
const CSGDNonDedBase = 0.9825;

const IRCANTECTauxInf = 0.028;
const IRCANTECTauxSup = 0.0695;
const IRCANTECBase = 2/3;

export {
    date,
    source,
    traitementsBase,
    traitementTaux,
    sujetionBase,
    sujetionTaux,
    responsabilite4Base,
    responsabilite5Base,
    responsabiliteTaux,
    montantGardeSemaine,
    montantGardeWE,
    logeBase,
    logeTaux,
    nourriBase,
    nourriTaux,
    logenourriBase,
    logenourriTaux,
    SSTotTauxFrance,
    SSTotTauxAlsace,
    SSTotBase,
    SSPlafTaux,
    SSPlafBase,
    plafondSS,
    CRDSTaux,
    CRDSBase,
    CSGDedTaux,
    CSGDedBase,
    CSGNonDedTaux,
    CSGDNonDedBase,
    IRCANTECTauxInf,
    IRCANTECTauxSup,
    IRCANTECBase    
}
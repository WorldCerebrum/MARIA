const contentNode = document.getElementById('fhirData');

const patientCount = 50;
const fhirUrl = "https://syntheticmass.mitre.org/fhir/";
//const patientFilter = 'https://syntheticmass.mitre.org/fhir/Patient?_has:Observation:patient:code=http://loinc.org|2339-0&_count=3';
const patientFilter = `${fhirUrl}Patient?_has:Observation:patient:code=http://loinc.org|2339-0&_count=${patientCount}`;
//const observationUrl = 'https://syntheticmass.mitre.org/fhir/Observation?code=2339-0,8302-2,29463-7,39156-5,55284-4&_sort=-date&_count=5&patient=Patient/';
const observationUrl = `${fhirUrl}Observation?code=2339-0,8302-2,29463-7,39156-5,55284-4&_sort=-date&_count=5&patient=Patient/`;
//const conditionUrl = 'https://syntheticmass.mitre.org/fhir/Condition?code=15777000,44054006&patient=';
const conditionUrl = `${fhirUrl}Condition?code=15777000,44054006&patient=`;

const sortByDateDescending = "-date";

const observation = "Observation";
const LOINC = "http://loinc.org";
const observationGlucose = "2339-0";
const observationBodyHeight = "8302-2";
const observationBodyWeight = "29463-7";
const observationBodyMassIndex = "39156-5";
const observationBloodPressure = "55284-4";
const observationSystolic = '8480-6';
const observationDiastolic = '8462-4';

const condition = "Condition";
const SNOMED = "http://snomed.info/sct";
const conditionPreDiabetes = "15777000";
const conditionDiabetes = "44054006";

class PatientFilter extends React.Component {
    render() {
      return (
        <div>{patientFilter}</div>
      )
    }
  }

class PatientRow extends React.Component {
    render() {
      const patient = this.props.patient;
      return (
        <tr>
          <td className={'text-center'}>{patient.id}</td>
          <td className={'text-center'}>{patient.gender}</td>
          <td className={'text-center'}>{patient.birthDate}</td>
          <td className={'text-center'}>{patient.bodyHeight}</td>
          <td className={'text-center'}>{patient.bodyWeight}</td>
          <td className={'text-center'}>{patient.bodyMassIndex}</td>
          <td className={'text-center'}>{patient.glucose}</td>
          <td className={'text-center'}>{patient.systolic}</td>
          <td className={'text-center'}>{patient.diastolic}</td>
          <td className={'text-center'}>{patient.prediabetes}</td>
          <td className={'text-center'}>{patient.diabetes}</td>
        </tr>
      )
    }
  }

class PatientTable extends React.Component {
    render() {
        const patientRows = this.props.patients.map(patient => <PatientRow key={patient.id} patient={patient} />)
        return (
                  <table id="dataTable" className={"table-fill"}>
                    <thead>
                      <tr>
                        <th className={'text-center'}>Id</th>
                        <th className={'text-center'}>Gender</th>
                        <th className={'text-center'}>DoB</th>
                        <th className={'text-center'}>Height</th>
                        <th className={'text-center'}>Weight</th>
                        <th className={'text-center'}>BMI</th>
                        <th className={'text-center'}>Glucose</th>
                        <th className={'text-center'}>Systolic</th>
                        <th className={'text-center'}>Diastolic</th>
                        <th className={'text-center'}>Prediabetes</th>
                        <th className={'text-center'}>Diabetes</th>
                      </tr>
                    </thead>
                        <tbody  className={'table-hover'}>{patientRows}</tbody>
                  </table>
        )
    }
  }

class PatientList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            patients: []
        }
    }

    componentWillMount() {
        localStorage.getItem('patients') && this.setState({
            patients: JSON.parse(localStorage.getItem('patients')),
            isLoading: false
        })
    }

    componentDidMount(){

        const date = localStorage.getItem('patientsDate');
        const patientsDate = date && new Date(parseInt(date));
        const now = new Date();

        const dataAge = Math.round((now - patientsDate) / (1000 * 60)); // in minutes
        const tooOld = dataAge >= 1;

        if(tooOld){
            this.fetchData();            
        } else {
            console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
        }
        
        $("#dataTable").tableExport();
    }

    encodeUrl(params){
        return Object.keys(params).map(function(key){ 
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]); 
          }).join('&');
    } 

    fetchData(){

        this.setState({
            isLoading: true,
            patients: []
        })

        fetch(patientFilter)
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.entry.map(entry => (
            {
                id: `${entry.resource.id}`,
                gender: `${entry.resource.gender}`,
                birthDate: `${entry.resource.birthDate}`,
            }
        )))
        .then(patients => patients.map(patient => {
            const {id, gender, birthDate} = patient;
            return fetch(`${observationUrl}${id}`)
            .then(response => response.json())
            .then(parsedJSON => {
                const entry = parsedJSON.entry;
                entry.map(res => {
                    const code = res.resource && res.resource.code && res.resource.code.coding[0] ? res.resource.code.coding[0].code : null;
                    const value = code && res.resource.valueQuantity ? res.resource.valueQuantity.value : null;

                    switch (code) {
                        case observationGlucose:
                        patient.glucose = value;
                        break;
                    case observationBodyHeight:
                        patient.bodyHeight = value.toFixed(1);
                        break;
                    case observationBodyWeight:
                        patient.bodyWeight = value.toFixed(1);
                        break;
                    case observationBodyMassIndex:
                        patient.bodyMassIndex = value.toFixed(1);
                        break;
                    case observationBloodPressure:
                        const component = res.resource.component;
                        if (component){
                            component.map(comp => {
                                const compCode = comp && comp.code && comp.code.coding[0] ? comp.code.coding[0].code : null;
                                const compValue = compCode  && comp.valueQuantity ? comp.valueQuantity.value : null;
                                switch (compCode) {
                                    case observationSystolic:
                                        patient.systolic = compValue.toFixed(0);
                                        break;
                                    case observationDiastolic:
                                        patient.diastolic = compValue.toFixed(0);
                                        break;
                                    default:
                                        break;
                                }
                            })
                        }
                        break;
                      
                    default:
                        break;
                    }
                })
            })
            .then(() => { 
                const {id, gender, birthDate} = patient;
                    
                return fetch(`${conditionUrl}${id}`)
                    .then(response => response.json())
                    .then(parsedJSON => {
                        const entry = parsedJSON.entry;
                        entry.map(res =>{
                            const condCode = res && res.resource && res.resource.code && res.resource.code.coding[0] ? res.resource.code.coding["0"].code : null;
                            switch (condCode) {
                                case conditionPreDiabetes:
                                    patient.prediabetes = 'Y';
                                    break;
                                case conditionDiabetes:
                                    patient.diabetes = 'Y';
                                    break;
                            
                                default:
                                    break;
                            }
                        })
                        this.setState({
                            isLoading: false,
                            patients
                        })
                    })
            })
            .catch(error => console.log('parsing failed', error))
        }))
        .catch(error => console.log('parsing failed', error))
    }
    
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('patients', JSON.stringify(nextState.patients));
        localStorage.setItem('patientsDate', Date.now());
    } 

    render() {
        const {isLoading, patients} = this.state;
        return (
          <div>
            <h2>Patient list</h2>
            <div>Download a FHIR dataset below</div>
            <hr />
            <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                <PatientTable patients={patients}/>
                <div className="loader">
                    <div className="icon"></div>
                </div>
            </div>
          </div>
        );
    }
}

ReactDOM.render(<PatientList />, contentNode);    // Render the component inside the content Node

        // Patient Glucose and Weight
        // https://syntheticmass.mitre.org/fhir/Observation?patient=Patient/58b3663e3425def0f0f6a229&code=2339-0,8302-2&_sort=-date&_count=2
        // Patient observations
        // https://syntheticmass.mitre.org/fhir/Observation?patient=Patient/58b3663e3425def0f0f6a229&code=2339-0,8302-2,29463-7,39156-5,55284-4&_sort=-date&_count=5

        // Fetch the last 3 results for all vitals for a patient
        // GET [base]/Observation$lastn?max=3&patient=Patient/123&category=vital-signs
        // Fetch the last 3 blood pressures, respiratory rate and heart rates for a 
        // GET [base]/Observation$lastn?max=3&patient=Patient/123&category=vital-signs&code=9279-1,8867-4,85354-9

        // Patient with glucose observation
        //  https://syntheticmass.mitre.org/fhir/Patient?_has:Observation:patient:code=http://loinc.org|2339-0&_count=10
        // Patient with glucose observation and Height observation
        //  https://syntheticmass.mitre.org/fhir/Patient?_has:Observation:patient:code=http://loinc.org|2339-0&_has:Observation:patient:code=http://loinc.org|8302-2&_count=10

        // Observation query
        //   - Glucose
        //   https://syntheticmass.mitre.org/fhir/Observation?_sort=-date&_count=1&code=http://loinc.org|2339-0&patient=58b3663e3425def0f0f6a229
        //   - Body Height
        //   https://syntheticmass.mitre.org/fhir/Observation?_sort=-date&_count=1&code=http://loinc.org|8302-2&patient=58b3663e3425def0f0f6a229
        //   - Body Weight
        //   https://syntheticmass.mitre.org/fhir/Observation?_sort=-date&_count=1&code=http://loinc.org|29463-7&patient=58b3663e3425def0f0f6a229
        //   - Body Mass Index
        //   https://syntheticmass.mitre.org/fhir/Observation?_sort=-date&_count=1&code=http://loinc.org|39156-5&patient=58b3663e3425def0f0f6a229
        //   - Blood Pressure 
        //   https://syntheticmass.mitre.org/fhir/Observation?_sort=-date&_count=1&code=http://loinc.org|55284-4&patient=58b3663e3425def0f0f6a229
        //
        // Condition query
        //   - Prediabetes
        //   https://syntheticmass.mitre.org/fhir/Condition?code=http://snomed.info/sct|15777000&patient=58b3663e3425def0f0f6a229
        //   - Diabetes
        //   https://syntheticmass.mitre.org/fhir/Condition?code=http://snomed.info/sct|44054006&patient=58b3663e3425def0f0f6a229
        //   

        //fetch('https://syntheticmass.mitre.org/fhir/Patient?_count=3')
        //fetch('https://syntheticmass.mitre.org/fhir/Patient/58b3663e3425def0f0f6a229')
        //fetch('https://syntheticmass.mitre.org/fhir/Patient?_has:Observation:patient:code=http://loinc.org|2339-0&_count=10')
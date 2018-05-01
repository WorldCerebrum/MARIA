"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('contents');

var patientCount = 50;
var fhirUrl = "https://syntheticmass.mitre.org/fhir/";
//const patientFilter = 'https://syntheticmass.mitre.org/fhir/Patient?_has:Observation:patient:code=http://loinc.org|2339-0&_count=3';
var patientFilter = fhirUrl + "Patient?_has:Observation:patient:code=http://loinc.org|2339-0&_count=" + patientCount;
//const observationUrl = 'https://syntheticmass.mitre.org/fhir/Observation?code=2339-0,8302-2,29463-7,39156-5,55284-4&_sort=-date&_count=5&patient=Patient/';
var observationUrl = fhirUrl + "Observation?code=2339-0,8302-2,29463-7,39156-5,55284-4&_sort=-date&_count=5&patient=Patient/";
//const conditionUrl = 'https://syntheticmass.mitre.org/fhir/Condition?code=15777000,44054006&patient=';
var conditionUrl = fhirUrl + "Condition?code=15777000,44054006&patient=";

var sortByDateDescending = "-date";

var observation = "Observation";
var LOINC = "http://loinc.org";
var observationGlucose = "2339-0";
var observationBodyHeight = "8302-2";
var observationBodyWeight = "29463-7";
var observationBodyMassIndex = "39156-5";
var observationBloodPressure = "55284-4";
var observationSystolic = '8480-6';
var observationDiastolic = '8462-4';

var condition = "Condition";
var SNOMED = "http://snomed.info/sct";
var conditionPreDiabetes = "15777000";
var conditionDiabetes = "44054006";

var PatientFilter = function (_React$Component) {
    _inherits(PatientFilter, _React$Component);

    function PatientFilter() {
        _classCallCheck(this, PatientFilter);

        return _possibleConstructorReturn(this, (PatientFilter.__proto__ || Object.getPrototypeOf(PatientFilter)).apply(this, arguments));
    }

    _createClass(PatientFilter, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                patientFilter
            );
        }
    }]);

    return PatientFilter;
}(React.Component);

var PatientRow = function (_React$Component2) {
    _inherits(PatientRow, _React$Component2);

    function PatientRow() {
        _classCallCheck(this, PatientRow);

        return _possibleConstructorReturn(this, (PatientRow.__proto__ || Object.getPrototypeOf(PatientRow)).apply(this, arguments));
    }

    _createClass(PatientRow, [{
        key: "render",
        value: function render() {
            var patient = this.props.patient;
            //console.log('patient',patient);
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    patient.id
                ),
                React.createElement(
                    "td",
                    null,
                    patient.gender
                ),
                React.createElement(
                    "td",
                    null,
                    patient.birthDate
                ),
                React.createElement(
                    "td",
                    null,
                    patient.bodyHeight
                ),
                React.createElement(
                    "td",
                    null,
                    patient.bodyWeight
                ),
                React.createElement(
                    "td",
                    null,
                    patient.bodyMassIndex
                ),
                React.createElement(
                    "td",
                    null,
                    patient.glucose
                ),
                React.createElement(
                    "td",
                    null,
                    patient.systolic
                ),
                React.createElement(
                    "td",
                    null,
                    patient.diastolic
                ),
                React.createElement(
                    "td",
                    null,
                    patient.prediabetes
                ),
                React.createElement(
                    "td",
                    null,
                    patient.diabetes
                )
            );
        }
    }]);

    return PatientRow;
}(React.Component);

var PatientTable = function (_React$Component3) {
    _inherits(PatientTable, _React$Component3);

    function PatientTable() {
        _classCallCheck(this, PatientTable);

        return _possibleConstructorReturn(this, (PatientTable.__proto__ || Object.getPrototypeOf(PatientTable)).apply(this, arguments));
    }

    _createClass(PatientTable, [{
        key: "render",
        value: function render() {
            var patientRows = this.props.patients.map(function (patient) {
                return React.createElement(PatientRow, { key: patient.id, patient: patient });
            });
            return React.createElement(
                "table",
                { className: "bordered-table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "Id"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Gender"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Birth Date"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Body Height"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Body Weight"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Body Mass Index"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Glucose"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Systolic"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Diastolic"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Prediabetes"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Diabetes"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    patientRows
                )
            );
        }
    }]);

    return PatientTable;
}(React.Component);

var PatientList = function (_React$Component4) {
    _inherits(PatientList, _React$Component4);

    function PatientList(props) {
        _classCallCheck(this, PatientList);

        var _this4 = _possibleConstructorReturn(this, (PatientList.__proto__ || Object.getPrototypeOf(PatientList)).call(this, props));

        _this4.state = {
            isLoading: true,
            patients: []
        };
        return _this4;
    }

    _createClass(PatientList, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            localStorage.getItem('patients') && this.setState({
                patients: JSON.parse(localStorage.getItem('patients')),
                isLoading: false
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {

            var date = localStorage.getItem('patientsDate');
            var patientsDate = date && new Date(parseInt(date));
            var now = new Date();

            var dataAge = Math.round((now - patientsDate) / (1000 * 60)); // in minutes
            var tooOld = dataAge >= 1;

            if (tooOld) {
                this.fetchData();
            } else {
                console.log("Using data from localStorage that are " + dataAge + " minutes old.");
            }
        }
    }, {
        key: "encodeUrl",
        value: function encodeUrl(params) {
            return Object.keys(params).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            }).join('&');
        }
    }, {
        key: "fetchData",
        value: function fetchData() {
            var _this5 = this;

            this.setState({
                isLoading: true,
                patients: []
            });

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
            fetch(patientFilter).then(function (response) {
                return response.json();
            }).then(function (parsedJSON) {
                return parsedJSON.entry.map(function (entry) {
                    return {
                        id: "" + entry.resource.id,
                        gender: "" + entry.resource.gender,
                        birthDate: "" + entry.resource.birthDate
                    };
                });
            }).then(function (patients) {
                return patients.map(function (patient) {
                    var id = patient.id,
                        gender = patient.gender,
                        birthDate = patient.birthDate;

                    return fetch("" + observationUrl + id).then(function (response) {
                        return response.json();
                    }).then(function (parsedJSON) {
                        var entry = parsedJSON.entry;
                        entry.map(function (res) {
                            var code = res.resource && res.resource.code && res.resource.code.coding[0] ? res.resource.code.coding[0].code : null;
                            var value = code && res.resource.valueQuantity ? res.resource.valueQuantity.value : null;

                            switch (code) {
                                case observationGlucose:
                                    patient.glucose = value;
                                    break;
                                case observationBodyHeight:
                                    patient.bodyHeight = value;
                                    break;
                                case observationBodyWeight:
                                    patient.bodyWeight = value;
                                    break;
                                case observationBodyMassIndex:
                                    patient.bodyMassIndex = value;
                                    break;
                                case observationBloodPressure:
                                    var component = res.resource.component;
                                    if (component) {
                                        component.map(function (comp) {
                                            var compCode = comp && comp.code && comp.code.coding[0] ? comp.code.coding[0].code : null;
                                            var compValue = compCode && comp.valueQuantity ? comp.valueQuantity.value : null;
                                            switch (compCode) {
                                                case observationSystolic:
                                                    patient.systolic = compValue;
                                                    break;
                                                case observationDiastolic:
                                                    patient.diastolic = compValue;
                                                    break;
                                                default:
                                                    break;
                                            }
                                        });
                                    }
                                    break;

                                default:
                                    break;
                            }
                        });
                    }).then(function () {
                        var id = patient.id,
                            gender = patient.gender,
                            birthDate = patient.birthDate;


                        return fetch("" + conditionUrl + id).then(function (response) {
                            return response.json();
                        }).then(function (parsedJSON) {
                            var entry = parsedJSON.entry;
                            entry.map(function (res) {
                                var condCode = res && res.resource && res.resource.code && res.resource.code.coding[0] ? res.resource.code.coding["0"].code : null;
                                switch (condCode) {
                                    case conditionPreDiabetes:
                                        patient.prediabetes = 1;
                                        break;
                                    case conditionDiabetes:
                                        patient.diabetes = 1;
                                        break;

                                    default:
                                        break;
                                }
                            });
                            _this5.setState({
                                isLoading: false,
                                patients: patients
                            });
                        });
                    }).catch(function (error) {
                        return console.log('parsing failed', error);
                    });
                });
            }).catch(function (error) {
                return console.log('parsing failed', error);
            });
        }
    }, {
        key: "componentWillUpdate",
        value: function componentWillUpdate(nextProps, nextState) {
            localStorage.setItem('patients', JSON.stringify(nextState.patients));
            localStorage.setItem('patientsDate', Date.now());
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                isLoading = _state.isLoading,
                patients = _state.patients;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Patient list"
                ),
                React.createElement(PatientFilter, null),
                React.createElement("hr", null),
                React.createElement(
                    "div",
                    { className: "content " + (isLoading ? 'is-loading' : '') },
                    React.createElement(PatientTable, { patients: patients }),
                    React.createElement(
                        "div",
                        { className: "loader" },
                        React.createElement("div", { className: "icon" })
                    )
                )
            );
        }
    }]);

    return PatientList;
}(React.Component);

ReactDOM.render(React.createElement(PatientList, null), contentNode); // Render the component inside the content Node
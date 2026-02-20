import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronRight, Loader2, Plus, Trash2, FileText, Zap, Sparkles } from 'lucide-react';
import './index.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export default function B2BRepairInterface() {
  const [step, setStep] = useState(1);
  const [devices, setDevices] = useState([{ id: 1, brand: '', model: '', qty: '' }]);
  const [grades, setGrades] = useState({});
  const [carriers, setCarriers] = useState({});
  const [serviceType, setServiceType] = useState('');
  const [faultCodes, setFaultCodes] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Other'];
  const carrierOptions = ['AT&T', 'Verizon', 'T-Mobile', 'Softbank', 'Hyla', 'Apple As-Is', 'Unlocked', 'Other'];
  const gradeOptions = ['Grade A', 'Grade B', 'Grade C', 'Grade D'];

  const faultCodeDescriptions = {
    'LCD': 'Screen Damaged (black marks, lines, dots)',
    'TP': 'Touch Not Working',
    'FG': 'Front Glass Cracked/Scratched',
    'HR': 'Back Glass Broken',
    'BR': 'Battery Needs Replacement',
    'BB': 'Battery Health Low',
    'CMD1': 'Main Camera Has Dots/Spots',
    'CHG': 'Charging Port Not Working',
    'SPE': 'Speaker/Earpiece Not Working'
  };

  const faultCodeOptions = {
    display: ['LCD', 'TP', 'FG'],
    glass: ['HR'],
    camera: ['CMD1'],
    battery: ['BR', 'BB'],
    other: ['CHG', 'SPE']
  };

  const addDevice = () => {
    setDevices([...devices, { id: Date.now(), brand: '', model: '', qty: '' }]);
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const updateDevice = (id, field, value) => {
    setDevices(devices.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const toggleFaultCode = (deviceId, code) => {
    setFaultCodes(prev => ({
      ...prev,
      [deviceId]: prev[deviceId]?.includes(code)
        ? prev[deviceId].filter(c => c !== code)
        : [...(prev[deviceId] || []), code]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const submissionData = {
      devices: devices.map(d => ({
        brand: d.brand,
        model: d.model,
        qty: parseInt(d.qty),
        grade: grades[d.id],
        carrier: carriers[d.id],
        faultCodes: faultCodes[d.id] || []
      })),
      serviceType
    };
    
    try {
      const response = await fetch(`${API_URL}/api/submit-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmissionResult(result);
        setSubmitted(true);
      } else {
        alert('Submission failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
    setLoading(false);
  };

  if (submitted && submissionResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-3xl scale-in" style={{border: '1px solid rgba(99, 102, 241, 0.1)'}}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">



cd ~/Desktop/b2b-repair-app/frontend







cat > src/RepairInterface.jsx << 'ENDFILE'
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronRight, Loader2, Plus, Trash2, FileText, Zap, Sparkles } from 'lucide-react';
import './index.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export default function B2BRepairInterface() {
  const [step, setStep] = useState(1);
  const [devices, setDevices] = useState([{ id: 1, brand: '', model: '', qty: '' }]);
  const [grades, setGrades] = useState({});
  const [carriers, setCarriers] = useState({});
  const [serviceType, setServiceType] = useState('');
  const [faultCodes, setFaultCodes] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const brands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Other'];
  const carrierOptions = ['AT&T', 'Verizon', 'T-Mobile', 'Softbank', 'Hyla', 'Apple As-Is', 'Unlocked', 'Other'];
  const gradeOptions = ['Grade A', 'Grade B', 'Grade C', 'Grade D'];

  const faultCodeDescriptions = {
    'LCD': 'Screen Damaged (black marks, lines, dots)',
    'TP': 'Touch Not Working',
    'FG': 'Front Glass Cracked/Scratched',
    'HR': 'Back Glass Broken',
    'BR': 'Battery Needs Replacement',
    'BB': 'Battery Health Low',
    'CMD1': 'Main Camera Has Dots/Spots',
    'CHG': 'Charging Port Not Working',
    'SPE': 'Speaker/Earpiece Not Working'
  };

  const faultCodeOptions = {
    display: ['LCD', 'TP', 'FG'],
    glass: ['HR'],
    camera: ['CMD1'],
    battery: ['BR', 'BB'],
    other: ['CHG', 'SPE']
  };

  const addDevice = () => {
    setDevices([...devices, { id: Date.now(), brand: '', model: '', qty: '' }]);
  };

  const removeDevice = (id) => {
    setDevices(devices.filter(d => d.id !== id));
  };

  const updateDevice = (id, field, value) => {
    setDevices(devices.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const toggleFaultCode = (deviceId, code) => {
    setFaultCodes(prev => ({
      ...prev,
      [deviceId]: prev[deviceId]?.includes(code)
        ? prev[deviceId].filter(c => c !== code)
        : [...(prev[deviceId] || []), code]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const submissionData = {
      devices: devices.map(d => ({
        brand: d.brand,
        model: d.model,
        qty: parseInt(d.qty),
        grade: grades[d.id],
        carrier: carriers[d.id],
        faultCodes: faultCodes[d.id] || []
      })),
      serviceType
    };
    
    try {
      const response = await fetch(`${API_URL}/api/submit-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmissionResult(result);
        setSubmitted(true);
      } else {
        alert('Submission failed: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
    setLoading(false);
  };

  if (submitted && submissionResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-3xl scale-in" style={{border: '1px solid rgba(99, 102, 241, 0.1)'}}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Enquiry Submitted Successfully!
            </h2>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 mb-8 shadow-lg">
              <p className="text-sm font-medium text-indigo-100 mb-2">Your Enquiry Number</p>
              <p className="text-4xl font-bold text-white tracking-wide">{submissionResult.enquiryNumber}</p>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              We've received your request. Our team will send you a detailed quote within 24 hours.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 fade-in" style={{border: '1px solid rgba(99, 102, 241, 0.1)'}}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                B2B Device Repair Portal
              </h1>
              <p className="text-gray-600 mt-1">Submit bulk repair enquiries with AI assistance</p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-110' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`h-1 flex-1 rounded-full transition-all ${step > s ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 slide-in" style={{border: '1px solid rgba(99, 102, 241, 0.1)'}}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              Device Information
            </h2>
            
            {devices.map((device, index) => (
              <div key={device.id} className="mb-6 p-6 border-2 border-gray-100 rounded-2xl hover:border-indigo-200 transition-all bg-gradient-to-br from-white to-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-gray-800">Device #{index + 1}</h3>
                  {devices.length > 1 && (
                    <button onClick={() => removeDevice(device.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select 
                    value={device.brand} 
                    onChange={(e) => updateDevice(device.id, 'brand', e.target.value)} 
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 font-medium"
                  >
                    <option value="">Select Brand</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <input 
                    type="text" 
                    value={device.model} 
                    onChange={(e) => updateDevice(device.id, 'model', e.target.value)} 
                    placeholder="Model (e.g., iPhone 15)" 
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                  <input 
                    type="number" 
                    value={device.qty} 
                    onChange={(e) => updateDevice(device.id, 'qty', e.target.value)} 
                    placeholder="Quantity" 
                    min="1" 
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
            ))}
            
            <button
              onClick={addDevice}
              className="w-full border-2 border-dashed border-indigo-300 text-indigo-600 py-4 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-center font-semibold gap-2 mb-6"
            >
              <Plus className="w-5 h-5" />
              Add Another Device SKU
            </button>
            
            <button
              onClick={() => setStep(2)}
              disabled={!devices.every(d => d.brand && d.model && d.qty)}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue to Grade & Carrier
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 slide-in" style={{border: '1px solid rgba(99, 102, 241, 0.1)'}}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              Grade & Carrier Selection
            </h2>
            
            {devices.map((device, index) => (
              <div key={device.id} className="mb-8 p-6 border-2 border-gray-100 rounded-2xl bg-gradient-to-br from-white to-gray-50">
                <h3 className="font-bold text-xl mb-6 text-gray-800">
                  {device.brand} {device.model} <span className="text-indigo-600">({device.qty} units)</span>
                </h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Condition Grade *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {gradeOptions.map(grade => (
                      <button
                        key={grade}
                        onClick={() => setGrades({ ...grades, [device.id]: grade })}
                        className={`px-4 py-4 rounded-xl border-2 font-bold transition-all ${
                          grades[device.id] === grade
                            ? 'border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Carrier / Source *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {carrierOptions.map(carrier => (
                      <button
                        key={carrier}
                        onClick={() => setCarriers({ ...carriers, [device.id]: carrier })}
                        className={`px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all ${
                          carriers[device.id] === carrier
                            ? 'border-green-500 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg scale-105'
                            : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                        }`}
                      >
                        {carrier}
                      </button>
                    ))}
                  </div>
                </div>
                
                {grades[device.id] && carriers[device.id] && (
                  <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl fade-in">
                    <p className="text-sm text-blue-800 font-semibold">
                      ✓ {grades[device.id]} • {carriers[device.id]}
                    </p>
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!devices.every(d => grades[d.id] && carriers[d.id])}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 flex items-center justify-center gap-2"
              >
                Continue to Service Type
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 slide-in" style={{border: '1px solid rgba(99, 102, 241, 0.1)'}}>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Service Type & Fault Codes</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <button
                onClick={() => setServiceType('repair')}
                className={`p-8 rounded-2xl border-2 transition-all ${
                  serviceType === 'repair'
                    ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Repair Service</h3>
                <p className="text-gray-600">Fix specific faults and issues</p>
              </button>
              
              <button
                onClick={() => setServiceType('refurbish')}
                className={`p-8 rounded-2xl border-2 transition-all ${
                  serviceType === 'refurbish'
                    ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Refurbish Service</h3>
                <p className="text-gray-600">Complete restoration to like-new</p>
              </button>
            </div>

            {devices.map((device) => (
              <div key={device.id} className="mb-8 p-6 border-2 border-gray-100 rounded-2xl bg-gradient-to-br from-white to-gray-50">
                <h3 className="font-bold text-xl mb-4 text-gray-800">{device.brand} {device.model}</h3>
                <div className="space-y-4">
                  {Object.entries(faultCodeOptions).map(([category, codes]) => (
                    <div key={category}>
                      <h4 className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {codes.map(code => (
                          <button
                            key={code}
                            onClick={() => toggleFaultCode(device.id, code)}
                            className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                              faultCodes[device.id]?.includes(code)
                                ? 'border-indigo-500 bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                                : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                            }`}
                          >
                            <div className="flex flex-col items-start">
                              <span>{faultCodeDescriptions[code]}</span>
                              <span className="text-xs opacity-75">({code})</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!serviceType || loading}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl disabled:from-gray-300 disabled:to-gray-400 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Enquiry
                    <CheckCircle className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

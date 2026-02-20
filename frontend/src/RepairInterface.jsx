import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronRight, Loader2, Plus, Trash2, FileText, Zap } from 'lucide-react';

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
      }
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

  if (submitted && submissionResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-3xl text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Enquiry Submitted!</h2>
          <div className="bg-indigo-50 rounded-xl p-6 mb-6">
            <p className="text-2xl font-bold text-indigo-600">{submissionResult.enquiryNumber}</p>
          </div>
          <button onClick={() => window.location.reload()} className="bg-indigo-600 text-white px-8 py-3 rounded-lg">
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">B2B Device Repair Portal</h1>
          <p className="text-gray-600">Submit bulk repair enquiries</p>
        </div>

        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 1: Device Information</h2>
            {devices.map((device, index) => (
              <div key={device.id} className="mb-6 p-4 border rounded-lg">
                <div className="flex justify-between mb-4">
                  <h3 className="font-semibold">Device #{index + 1}</h3>
                  {devices.length > 1 && (
                    <button onClick={() => removeDevice(device.id)} className="text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select value={device.brand} onChange={(e) => updateDevice(device.id, 'brand', e.target.value)} className="px-4 py-2 border rounded-lg">
                    <option value="">Select Brand</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <input type="text" value={device.model} onChange={(e) => updateDevice(device.id, 'model', e.target.value)} placeholder="Model" className="px-4 py-2 border rounded-lg" />
                  <input type="number" value={device.qty} onChange={(e) => updateDevice(device.id, 'qty', e.target.value)} placeholder="Quantity" min="1" className="px-4 py-2 border rounded-lg" />
                </div>
              </div>
            ))}
            <button onClick={addDevice} className="w-full border-2 border-dashed border-indigo-300 text-indigo-600 py-3 rounded-lg mb-6 flex items-center justify-center">
              <Plus className="w-5 h-5 mr-2" />Add Another Device
            </button>
            <button onClick={() => setStep(2)} disabled={!devices.every(d => d.brand && d.model && d.qty)} className="w-full bg-indigo-600 text-white py-3 rounded-lg disabled:bg-gray-300">
              Continue <ChevronRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 2: Grade & Carrier</h2>
            {devices.map((device, index) => (
              <div key={device.id} className="mb-8 p-6 border-2 rounded-xl">
                <h3 className="font-bold text-lg mb-4">{device.brand} {device.model} ({device.qty} units)</h3>
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">Grade *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {gradeOptions.map(grade => (
                      <button key={grade} onClick={() => setGrades({ ...grades, [device.id]: grade })} className={`px-4 py-3 rounded-lg border-2 ${grades[device.id] === grade ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}>
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3">Carrier *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {carrierOptions.map(carrier => (
                      <button key={carrier} onClick={() => setCarriers({ ...carriers, [device.id]: carrier })} className={`px-4 py-3 rounded-lg border-2 text-sm ${carriers[device.id] === carrier ? 'border-green-600 bg-green-50' : 'border-gray-300'}`}>
                        {carrier}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 border py-3 rounded-lg">Back</button>
              <button onClick={() => setStep(3)} disabled={!devices.every(d => grades[d.id] && carriers[d.id])} className="flex-1 bg-indigo-600 text-white py-3 rounded-lg disabled:bg-gray-300">
                Continue <ChevronRight className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Step 3: Service Type & Faults</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <button onClick={() => setServiceType('repair')} className={`p-6 rounded-xl border-2 ${serviceType === 'repair' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}>
                <h3 className="text-xl font-bold mb-2">Repair Service</h3>
                <p className="text-sm text-gray-600">Fix specific faults</p>
              </button>
              <button onClick={() => setServiceType('refurbish')} className={`p-6 rounded-xl border-2 ${serviceType === 'refurbish' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}>
                <h3 className="text-xl font-bold mb-2">Refurbish Service</h3>
                <p className="text-sm text-gray-600">Complete restoration</p>
              </button>
            </div>

            {devices.map((device) => (
              <div key={device.id} className="mb-8 p-6 border rounded-lg">
                <h3 className="font-bold text-lg mb-4">{device.brand} {device.model}</h3>
                <div className="space-y-4">
                  {Object.entries(faultCodeOptions).map(([category, codes]) => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 capitalize">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {codes.map(code => (
                          <button key={code} onClick={() => toggleFaultCode(device.id, code)} className={`px-3 py-2 rounded-lg text-sm border-2 ${faultCodes[device.id]?.includes(code) ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'}`}>
                            {faultCodeDescriptions[code]} ({code})
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="flex-1 border py-3 rounded-lg">Back</button>
              <button onClick={handleSubmit} disabled={!serviceType} className="flex-1 bg-green-600 text-white py-3 rounded-lg disabled:bg-gray-300">
                Submit Enquiry <CheckCircle className="w-5 h-5 inline ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

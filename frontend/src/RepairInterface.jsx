import React, { useState } from 'react';
import { CheckCircle, ChevronRight, Loader2, Plus, Trash2 } from 'lucide-react';

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
    LCD: 'Screen Damaged',
    TP: 'Touch Not Working',
    FG: 'Front Glass Cracked',
    HR: 'Back Glass Broken',
    BR: 'Battery Replacement',
    BB: 'Battery Health Low',
    CMD1: 'Main Camera Dots',
    CHG: 'Charging Port',
    SPE: 'Speaker Issue'
  };

  const faultCodeOptions = {
    display: ['LCD', 'TP', 'FG'],
    glass: ['HR'],
    camera: ['CMD1'],
    battery: ['BR', 'BB'],
    other: ['CHG', 'SPE']
  };

  const addDevice = () => setDevices([...devices, { id: Date.now(), brand: '', model: '', qty: '' }]);
  const removeDevice = (id) => setDevices(devices.filter(d => d.id !== id));
  const updateDevice = (id, field, value) => setDevices(devices.map(d => d.id === id ? { ...d, [field]: value } : d));
  
  const toggleFaultCode = (deviceId, code) => {
    setFaultCodes(prev => ({
      ...prev,
      [deviceId]: prev[deviceId]?.includes(code) ? prev[deviceId].filter(c => c !== code) : [...(prev[deviceId] || []), code]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/submit-enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devices: devices.map(d => ({
            brand: d.brand, model: d.model, qty: parseInt(d.qty),
            grade: grades[d.id], carrier: carriers[d.id], faultCodes: faultCodes[d.id] || []
          })),
          serviceType
        })
      });
      const result = await response.json();
      if (result.success) {
        setSubmissionResult(result);
        setSubmitted(true);
      } else alert('Failed: ' + result.error);
    } catch (error) {
      alert('Submission failed');
    }
    setLoading(false);
  };

  const buttonStyle = (isSelected) => ({
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid',
    borderColor: isSelected ? '#6366f1' : '#e5e7eb',
    background: isSelected ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : 'white',
    color: isSelected ? 'white' : '#374151',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isSelected ? '0 4px 12px rgba(99, 102, 241, 0.4)' : 'none'
  });

  if (submitted && submissionResult) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '60px', maxWidth: '600px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
            <CheckCircle size={48} color="white" />
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '24px' }}>Success!</h2>
          <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', marginBottom: '8px' }}>Enquiry Number</p>
            <p style={{ color: 'white', fontSize: '28px', fontWeight: '800' }}>{submissionResult.enquiryNumber}</p>
          </div>
          <button onClick={() => window.location.reload()} style={{ ...buttonStyle(true), width: '100%', fontSize: '16px' }}>
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', padding: '32px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '40px', marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: '40px', fontWeight: '800', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
            B2B Device Repair Portal
          </h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>Submit bulk repair enquiries</p>
          
          <div style={{ display: 'flex', gap: '8px', marginTop: '32px', alignItems: 'center' }}>
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: step >= s ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' : '#e5e7eb',
                  color: step >= s ? 'white' : '#9ca3af',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', transform: step >= s ? 'scale(1.1)' : 'scale(1)',
                  transition: 'all 0.3s'
                }}>{s}</div>
                {s < 3 && <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: step > s ? 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)' : '#e5e7eb', transition: 'all 0.3s' }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px' }}>Device Information</h2>
            {devices.map((device, i) => (
              <div key={device.id} style={{ marginBottom: '24px', padding: '24px', border: '2px solid #f3f4f6', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: '700' }}>Device #{i + 1}</h3>
                  {devices.length > 1 && <button onClick={() => removeDevice(device.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}><Trash2 size={20} /></button>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <select value={device.brand} onChange={(e) => updateDevice(device.id, 'brand', e.target.value)} style={{ padding: '12px', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '14px' }}>
                    <option value="">Select Brand</option>
                    {brands.map(b => <option key={b}>{b}</option>)}
                  </select>
                  <input type="text" value={device.model} onChange={(e) => updateDevice(device.id, 'model', e.target.value)} placeholder="Model" style={{ padding: '12px', border: '2px solid #e5e7eb', borderRadius: '12px' }} />
                  <input type="number" value={device.qty} onChange={(e) => updateDevice(device.id, 'qty', e.target.value)} placeholder="Quantity" min="1" style={{ padding: '12px', border: '2px solid #e5e7eb', borderRadius: '12px' }} />
                </div>
              </div>
            ))}
            <button onClick={addDevice} style={{ ...buttonStyle(false), width: '100%', marginBottom: '24px', borderStyle: 'dashed' }}><Plus size={20} style={{ marginRight: '8px' }} />Add Device</button>
            <button onClick={() => setStep(2)} disabled={!devices.every(d => d.brand && d.model && d.qty)} style={{ ...buttonStyle(true), width: '100%', fontSize: '16px' }}>Continue <ChevronRight size={20} /></button>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px' }}>Grade & Carrier</h2>
            {devices.map((device, i) => (
              <div key={device.id} style={{ marginBottom: '32px', padding: '24px', border: '2px solid #f3f4f6', borderRadius: '16px' }}>
                <h3 style={{ fontWeight: '700', marginBottom: '24px', fontSize: '18px' }}>{device.brand} {device.model} ({device.qty} units)</h3>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px', fontSize: '14px' }}>Grade *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                    {gradeOptions.map(grade => (
                      <button key={grade} onClick={() => setGrades({ ...grades, [device.id]: grade })} style={buttonStyle(grades[device.id] === grade)}>{grade}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '12px', fontSize: '14px' }}>Carrier *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                    {carrierOptions.map(carrier => (
                      <button key={carrier} onClick={() => setCarriers({ ...carriers, [device.id]: carrier })} style={buttonStyle(carriers[device.id] === carrier)}>{carrier}</button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => setStep(1)} style={{ ...buttonStyle(false), flex: 1 }}>Back</button>
              <button onClick={() => setStep(3)} disabled={!devices.every(d => grades[d.id] && carriers[d.id])} style={{ ...buttonStyle(true), flex: 1 }}>Continue <ChevronRight size={20} /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px' }}>Service & Faults</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <button onClick={() => setServiceType('repair')} style={{ ...buttonStyle(serviceType === 'repair'), padding: '32px', flexDirection: 'column', display: 'flex' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Repair Service</h3>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>Fix specific faults</p>
              </button>
              <button onClick={() => setServiceType('refurbish')} style={{ ...buttonStyle(serviceType === 'refurbish'), padding: '32px', flexDirection: 'column', display: 'flex' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Refurbish Service</h3>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>Complete restoration</p>
              </button>
            </div>

            {devices.map(device => (
              <div key={device.id} style={{ marginBottom: '24px', padding: '24px', border: '2px solid #f3f4f6', borderRadius: '16px' }}>
                <h3 style={{ fontWeight: '700', marginBottom: '16px' }}>{device.brand} {device.model}</h3>
                {Object.entries(faultCodeOptions).map(([cat, codes]) => (
                  <div key={cat} style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', color: '#6b7280', marginBottom: '8px' }}>{cat}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {codes.map(code => (
                        <button key={code} onClick={() => toggleFaultCode(device.id, code)} style={buttonStyle(faultCodes[device.id]?.includes(code))}>
                          {faultCodeDescriptions[code]} ({code})
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => setStep(2)} style={{ ...buttonStyle(false), flex: 1 }}>Back</button>
              <button onClick={handleSubmit} disabled={!serviceType || loading} style={{ ...buttonStyle(true), flex: 1, background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                {loading ? <><Loader2 size={20} className="animate-spin" style={{ marginRight: '8px' }} />Submitting...</> : <>Submit <CheckCircle size={20} /></>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

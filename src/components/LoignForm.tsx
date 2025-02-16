import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import './comp.css'
import { useNavigate } from "react-router-dom";

interface SliderData {
  id: number;
  name: string;
  value: number;
}

interface FormData {
  number: string;
  select: string;
  mainSlider: number;
  customSliders: SliderData[];
}



const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    number: '',
    select: '',
    mainSlider: 50,
    customSliders: [
      { id: 1, name: 'História', value: 50 },
      { id: 2, name: 'Príroda ', value: 50 },
      { id: 3, name: 'Kultúra', value: 50 },
      { id: 4, name: 'Welness ', value: 50 },
      { id: 5, name: 'Šport ', value: 50 },
      { id: 6, name: 'Signature 6', value: 50 },
    ]
  });



  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempName, setTempName] = useState<string>('');

  const handleSliderChange = (value: number, id: number) => {
    setFormData(prev => ({
      ...prev,
      customSliders: prev.customSliders.map(slider =>
        slider.id === id ? { ...slider, value } : slider
      )
    }));
  };

  const navigate = useNavigate();

  const goToOutput = () => {
    console.log(formData);
    navigate("/output");
  };  

  const handleMainSliderChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      mainSlider: value
    }));
  };

  const startEditing = (id: number, currentName: string) => {
    setEditingId(id);
    setTempName(currentName);
  };

  const saveSliderName = (id: number) => {
    setFormData(prev => ({
      ...prev,
      customSliders: prev.customSliders.map(slider =>
        slider.id === id ? { ...slider, name: tempName } : slider
      )
    }));
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'form-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#1c5364] p-4">
      {/* Modified inner container with specific width */}
      <div  className="  bg-white/10 backdrop-blur-lg text-white rounded-lg p-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">skRoute</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Number Input Section */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Počet dní</h2>
            <input
              type="number"
              value={formData.number}
              onChange={(e) => setFormData(prev => ({ ...prev, number: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Počet dní"
            />
          </div>

          {/* Select Input Section */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Typ cestovateľa</h2>
            <select
              value={formData.select}
              onChange={(e) => setFormData(prev => ({ ...prev, select: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="" className="bg-[#1c5364]">Vyberte možnosť</option>
              <option value="option1" className="bg-[#1c5364]">Rodina</option>
              <option value="option2" className="bg-[#1c5364]">Pár </option>
              <option value="option3" className="bg-[#1c5364]">Kamaráti </option>
              <option value="option4" className="bg-[#1c5364]">Jednotlivec </option>
            </select>
          </div>

          {/* Main Slider Section */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Budget (€)</h2>
            <div className="space-y-1">
              <input
                type="range"
                min="20"
                max="1000"
                value={formData.mainSlider}
                onChange={(e) => handleMainSliderChange(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
              <div className="text-right text-sm text-gray-400">{formData.mainSlider}€</div>
            </div>
          </div>

          {/* Custom Sliders Grid */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Preferencie  </h2>
            <div className="grid grid-cols-2 gap-6">
              {formData.customSliders.map((slider) => (
                <div key={slider.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    {editingId === slider.id ? (
                      <div className="flex items-center space-x-2 w-full">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white"
                          onKeyPress={(e) => e.key === 'Enter' && saveSliderName(slider.id)}
                        />
                        
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm text-gray-300">{slider.name}</span>
                        
                          
                      </div>
                    )}
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={slider.value}
                    onChange={(e) => handleSliderChange(Number(e.target.value), slider.id)}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                  <div className="text-right text-sm text-gray-400">{slider.value}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={goToOutput}
              type="submit"
              className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <span>Vygenerovať</span>
              <ChevronRight  />
            </button>
            
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
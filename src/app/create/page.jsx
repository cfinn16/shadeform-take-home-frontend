'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Create() {
    const router = useRouter()
    const initialFormData = {
        cloud: '',
        region: '',
        shade_instance_type: '',
        shade_cloud: false,
        name: '',
    }
    const [formData, setFormData] = useState(initialFormData)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [availableTypes, setAvailableTypes] = useState([])
    const [availableRegions, setAvailableRegions] = useState([])
    const [availableShadeInstanceTypes, setAvailableShadeInstanceTypes] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/types')
        .then(response => response.json())
        .then(response => setAvailableTypes(response.instance_types))
        .catch(err => console.error(err));
    }, [])

    const onSubmit = async(e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (Object.values(formData).some(x => x === "")) {
            window.alert('All fields are required')
            setIsSubmitting(false)
            return
        }
        console.log(formData)
        const bodyData = {instance: formData}
        
        const res = await fetch('http://localhost:3000/instances', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(bodyData)
        })
        if (res.ok) {
            setIsSubmitting(false)
            setFormData(initialFormData)
            router.push('/')
        } else {
            window.alert('Something went wrong! Please try again')
            setIsSubmitting(false)
            setFormData(initialFormData)
        }
        
    }

    useEffect(() => {
        fetch('http://localhost:3000/types')
        .then(response => response.json())
        .then(response => setAvailableTypes(response.instance_types.filter((type) => type.cloud === formData.cloud)))
        .catch(err => console.error(err));
        setFormData({...formData, region: '', shade_instance_type: ''})
    }, [formData.cloud])

    useEffect(() => {
        setAvailableTypes(availableTypes.filter((type) => type.availability.some(x => x.available && x.region === formData.region)))
    }, [formData.region])

    useEffect(() => {
        if (formData.cloud.length > 0) {
            const availableRegions = []
            availableTypes.forEach((type) => {
                type.availability.filter(x => x.available).forEach((availability) => {
                    availableRegions.push(availability.region)
                }) 
            })
            setAvailableRegions([...new Set(availableRegions)])
        }
        if (formData.cloud.length > 0 && formData.region.length > 0) {
            const availableInstanceTypes = []
            availableTypes.forEach((type) => {
                availableInstanceTypes.push(type.shade_instance_type)
            })
            setAvailableShadeInstanceTypes([...new Set(availableInstanceTypes)])
        }
    }, [availableTypes, formData.cloud, formData.region])


    // useEffect(() => {
    //     console.log(availableTypes)
    // }, [availableTypes])

    // useEffect(() => {
    //     console.log(availableRegions)
    // }, [availableRegions])

    const handleChange = (e, key) => {
        setFormData({...formData, [key]: e.target.value})
    }

    return (
        <div className="flex flex-col min-h-screen justify-center items-center w-full">
        <h2 className="mb-6">Create a New Instance</h2>
            <form className="flex flex-col items-center gap-y-2 " onSubmit={onSubmit}>
                <div className="flex flex-col gap-x-2 w-full">
                    <label htmlFor="cloud">Cloud</label>
                    <select className="text-stone-950 px-1"  name="cloud" value={formData.cloud} onChange={(e) => handleChange(e, 'cloud')}>
                        <option value="">Select cloud</option>
                        <option value="aws">aws</option>
                        <option value="azure">azure</option>
                        <option value="lambdalabs">lambdalabs</option>
                        <option value="tensordock">tensordock</option>
                        <option value="runpod">runpod</option>
                        <option value="latitude">latitude</option>
                        <option value="jarvislabs">jarvislabs</option>
                        <option value="oblivus">oblivus</option>
                        <option value="papers">papers</option>
                        <option value="datacrunch">datacrunch</option>
                        <option value="massedcompute">massedcompute</option>
                        <option value="vultr">vultr</option>
                        </select>
                    
                </div>
                <div className="flex flex-col gap-x-2">
                <label htmlFor="region">Region</label>
                <select disabled={formData.cloud === ''} className="text-stone-950 px-1"  name="region" value={formData.region} onChange={(e) => handleChange(e, 'region')}>
                <option value="">{formData.cloud === '' ? 'Select cloud first' : 'Select option'}</option>
                   {availableRegions.map((region, idx) => {
                    return <option key={idx} value={region}>{region}</option>
                   })}
                  </select>
                </div>
                <div className="flex flex-col gap-x-2">
                <label htmlFor="shadeInstanceType">Shade Instance Type</label>
                    <select disabled={formData.cloud === ''} className="text-stone-950 px-1"  name="shadeInstanceType" value={formData.shade_instance_type} onChange={(e) => handleChange(e, 'shade_instance_type')}>
                        <option value="">{formData.cloud === '' ? 'Select cloud first' : 'Select option'}</option>
                        {availableShadeInstanceTypes.map((shadeInstance, idx) => {
                            return <option key={idx} value={shadeInstance}>{shadeInstance}</option>
                        })}
                    </select>
                </div>
                <div className="flex flex-row justify-between gap-x-2">
                    <label htmlFor="shadeCloud">Shade Cloud</label>
                    <input type="checkbox" name="shadeCloud" value={formData.shade_cloud} onChange={(e) => setFormData({...formData, shade_cloud: !formData.shade_cloud})}></input>
                </div>
                <div className="flex flex-col gap-x-2">
                    <label htmlFor="name">Name</label>
                    <input
                        className="text-stone-950 px-1" 
                        type="text" 
                        name="name" 
                        placeholder="Enter name" 
                        value={formData.name}
                        onChange={(e) => handleChange(e, 'name')} 
                  />
                </div>
                <button disabled={isSubmitting} type="submit" className="bg-sky-500 rounded px-8 py-2 disabled:opacity-50">Submit</button>
            </form>
        </div>
    )
}


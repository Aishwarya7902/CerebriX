interface inputProps {
    placeholder: string;
    reference?: any
    type?:string

}
export function Input({ reference, placeholder ,type= "text"}: inputProps) {
    return <div>
        <input
            ref={reference}
            placeholder={placeholder}
            type={type}
            className="w-full px-4 py-2 border border-gray-300 rounded m-2" />
    </div>
}
interface inputProps {
    placeholder: string;
    reference?: any

}
export function Input({ reference, placeholder }: inputProps) {
    return <div>
        <input
            ref={reference}
            placeholder={placeholder}
            type="text"
            className="px-4 py-2 border border-gray-300 rounded m-2" />
    </div>
}
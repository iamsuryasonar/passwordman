interface Props {
    strength: number | null,
}

function PasswordStrengthProgress(props: Props) {

    const { strength } = props;

    return (
        <>
            {
                (strength && strength > 0) ? <div className="w-full my-1 h-[5px] bg-slate-700 flex rounded-full">
                    <div
                        style={{
                            width: `${(strength / 5) * 100}%`,
                            backgroundColor: `${strength === 5 ? 'green' : strength >= 3 ? 'yellow' : 'red'}`
                        }}
                        className="h-full transition-all duration-500 ease-linear rounded-full">
                    </div>
                </div>
                    :
                    <div className="w-full h-[5px] bg-transparent flex rounded-full"></div>
            }
        </>
    )
}

export default PasswordStrengthProgress;
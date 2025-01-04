
interface passwordStrength {
    value: number,
    type: string,
    color: string,
}

interface Strength {
    passwordStrength: passwordStrength | null
}

function PasswordStrengthProgress(props: Strength) {

    const { passwordStrength } = props;

    return (
        <>
            {
                (passwordStrength && passwordStrength.value > 0) ? <div className="w-full h-[2px] bg-transparent flex rounded-full">
                    <div
                        style={{
                            width: `${(passwordStrength.value / 4) * 100}%`,
                            backgroundColor: `${passwordStrength.color}`
                        }}
                        className="h-full transition-all duration-500 ease-linear rounded-full">
                    </div>
                </div>
                    :
                    <div className="w-full h-[2px] bg-transparent flex rounded-full"></div>
            }
        </>
    )
}

export default PasswordStrengthProgress;
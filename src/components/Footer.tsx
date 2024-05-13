
function Footer(): JSX.Element {

    const footerText = 'Scandiweb Test assigment';

    return (
        <>
            <div className='d-flex justify-content-center border-top border-dark py-5'>
                {footerText}
            </div>
        </>
    );
}

export default Footer;
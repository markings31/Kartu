import classes from "./OrgInfo.module.css";
import OrgItem from "./OrgItem";

function OrgInfo(props) {
    return (
        <ul className={classes.list}>
            {Object.values(props.donors).map((donor) => (
                <div key={donor.uid}>
                    <OrgItem
                        redirect={donor.uid}
                        title={donor.donorInfo.name}
                        description={donor.donorInfo.description}
                        why={donor.donorInfo.why}
                        address={donor.donorInfo.address}
                        city={donor.donorInfo.city}
                        state={donor.donorInfo.state}
                        phone={donor.donorInfo.phone}
                        website={donor.donorInfo.website}
                        contactEmail={donor.donorInfo.contactEmail}
                        logo={donor.donorInfo.logo}
                        zip={donor.donorInfo.zip}
                        banner={donor.donorInfo.banner}
                    />
                </div>
            ))}
        </ul>
    );
}

export default OrgInfo;

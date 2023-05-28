## Dploma Smart contract

The following is a Solidity smart contract named "Dploma" that is designed to handle certifications and templates for a certification system. The contract allows the creation of certifications and templates, as well as the modification and deletion of certifications. It also incorporates specific characteristics regarding write permissions.

The contract defines several structs:

1. **Certification**: Represents a certification and contains the following information:
    - certAddrCertifier (address): Address of the certifier (issuer) of the certification.
    - certAddrCertified (address): Address of the certified individual.
    - certCertified (Certified): Struct containing details of the certified individual, including their first name, last name, and birthdate.
    - certCertifier (Certifier): Struct containing details of the certifier, including their name and physical address.
    - certTemplate (Template): Struct representing the template associated with the certification.

2. **Template**: Represents a certification template and contains the following information:
    - tempTitle (string): Title of the template.
    - tempName (string): Name of the template.
    - tempDate (uint256): Date of the template in Unix timestamp format.
    - tempSpecs (string[]): Array of strings representing additional specifications of the template.

3. **Certified**: Contains details of a certified individual, including their first name, last name, and birthdate.

4. **Certifier**: Contains details of a certifier, including their name and physical address.

The contract also defines several private mappings and variables:

- **mapCert:** Mapping that stores certifications using a unique identifier (bytes32) as the key. Only the certifier has write access to this mapping.
- **mapTemp:** Mapping that stores templates using a unique identifier (bytes32) as the key. Only the certifier has write access to this mapping.
- **unvisibleCertified:** Mapping that stores details of certified individuals who have chosen not to be publicly visible. Only the certifier has write access to this mapping.
- **studentVisibility:** Mapping that tracks the visibility status of certified individuals. Only the certifier has write access to this mapping.
- **templateId:** Variable used to generate unique template identifiers. Only the certifier has write access to this variable.

The contract provides the following functions:

- **createTemplate(_tempTitle: string, _tempName: string, _tempDate: uint256, _tempSpecs: string[]): bytes32**
    - Allows the creation of a new template by providing the template's title, name, date, and specifications.
    - Returns a unique identifier (bytes32) for the template.
 
- **insertWithTemplate(_cfiedFirstname: string, _cfiedLastname: string, _cfiedBirthdate: string, _cfierName: string, _cfierAdress: string, _hashTemplate: bytes32, _certifiedPubAddress: address): bytes32`**
    - Creates a certification using an existing template.
    - Requires providing the certified individual's details, certifier's details, the template identifier, and the certified individual's public address.
    - Returns a unique identifier (bytes32) for the certification.

- **insertWithoutTemplate(_cfiedFirstname: string, _cfiedLastname: string, _cfiedBirthdate: string, _cfierName: string, _cfierPhysicalAddress: string, _certifiedPubAddress: address, _tempTitle: string, _tempName: string, _tempDate: uint256, _tempSpecs: string[]): bytes32**
    - Creates a certification with a new template.
    - Requires providing the certified individual's details, certifier's details, certified individual's public address, and the details of the new template.
    - Returns a unique identifier (bytes32) for the certification.

- **toggleStudentVisibility(_hashCert: bytes32)**
    - Toggles the visibility status of a certified individual's details.
    - Requires providing the certification identifier (_hashCert).
    - Only the certified associated with the certification can invoke this function and modify the `studentVisibility` mapping.

- **getCertification(_hashCert: bytes32): Certification**
    - Retrieves the details of a certification using its unique identifier (_hashCert).
    - If the certified individual has chosen not to be publicly visible, their details are replaced with placeholder values.
    - Anyone can invoke this function to access certification details.

- **modifyTemplate(_hashCert: bytes32, _tempTitle: string, _tempName: string, _tempDate: uint256, _tempSpecs: string[])**
    - Modifies the details of a certification's associated template.
    - Requires providing the certification identifier (_hashCert) and the updated template details.
    - Only the certifier associated with the certification can invoke this function and modify the `mapCert` mapping.

- **deleteCertif(_hashCert: bytes32)**
    - Deletes a certification using its unique identifier (_hashCert).
    - Only the certifier associated with the certification can invoke this function and modify the `mapCert` mapping.

Please note that the specific access rights and visibility mentioned in the descriptions are enforced within the contract logic.

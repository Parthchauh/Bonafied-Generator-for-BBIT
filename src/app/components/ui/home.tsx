"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { jsPDF } from "jspdf";

export function SignupFormDemo() {
  // State variables for user input
  const [fullName, setFullName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [lastExam, setLastExam] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   // Validate that at least one field is filled
   if (!enrollmentNumber && !collegeId) {
    setErrorMessage("Please enter either Enrollment Number or College ID.");
    return;
  }

  // Clear the error message if validation passes
  setErrorMessage("");
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Set font size and style for the heading
    doc.setFontSize(20);
    doc.setFont("Georgia", "bold");
  
    const heading = "Bhailalbhai & Bhikhabhai Institute of Technology (BBIT)";
    const xPositionHeading = (doc.internal.pageSize.getWidth() - doc.getTextWidth(heading)) / 2;
  
    // Add heading and additional text
    doc.text(heading, xPositionHeading, 20);
  
    // Set font size and style for the additional text
    doc.setFontSize(16);
    doc.setFont("Georgia", "normal");
  
    const subHeading1 = "(A CVM Institution)";
    const subHeading2 = "Vallabh Vidyanagar-388 120, Gujarat";
  
    // Calculate xPosition for subheadings
    const xPositionSubHeading1 = (doc.internal.pageSize.getWidth() - doc.getTextWidth(subHeading1)) / 2;
    const xPositionSubHeading2 = (doc.internal.pageSize.getWidth() - doc.getTextWidth(subHeading2)) / 2;
  
    doc.text(subHeading1, xPositionSubHeading1, 30);
    doc.text(subHeading2, xPositionSubHeading2, 40);
  
    // Add one blank line of space
    doc.text("", xPositionSubHeading2, 50);
  
    // Set font for CERTIFICATE as a subheading
    doc.setFont("Georgia", "bold");
  
    // Center position for CERTIFICATE
    const xPositionCertificate = (doc.internal.pageSize.getWidth() - doc.getTextWidth("CERTIFICATE")) / 2;
  
    // Add CERTIFICATE title as a subheading
    doc.setFontSize(18);
    doc.text("CERTIFICATE", xPositionCertificate, 60);
  
    // Set font back to normal for the rest of the text
    doc.setFont("Georgia", "normal");
    doc.setFontSize(16);
  
    // Define consistent spacing between lines
    const lineSpacing = 15; // Adjust this value for more or less space
  
    // Create the full name and enrollment number texts
    const fullNameText = `This is to certify that Mr./Ms. `;
    const fullNameUnderlineText = `${fullName}`;
    const enrollmentText = `With Enrollment No. / College id: `;
    const enrollmentUnderlineText = `${enrollmentNumber}`;
  
    // Add full name text
    const fullNameXPosition = xPositionHeading;
    doc.text(fullNameText, fullNameXPosition, 80);
    const fullNameUnderlineXStart = fullNameXPosition + doc.getTextWidth(fullNameText);
    const fullNameUnderlineXEnd = fullNameUnderlineXStart + doc.getTextWidth(fullNameUnderlineText);
    const fullNameUnderlineY = 80;
  
    // Underline full name
    doc.text(fullNameUnderlineText, fullNameUnderlineXStart, 80);
    doc.line(fullNameUnderlineXStart, fullNameUnderlineY + 2, fullNameUnderlineXEnd, fullNameUnderlineY + 2);
  
    // Add space after full name
    const enrollmentYPosition = fullNameUnderlineY + lineSpacing; // Adjust this value for more or less space
  
    // Add enrollment number text
    doc.text(enrollmentText, fullNameXPosition, enrollmentYPosition);
    const enrollmentUnderlineXStart = fullNameXPosition + doc.getTextWidth(enrollmentText);
    const enrollmentUnderlineXEnd = enrollmentUnderlineXStart + doc.getTextWidth(enrollmentUnderlineText);
    const enrollmentUnderlineY = enrollmentYPosition;
  
    // Underline enrollment number
    doc.text(enrollmentUnderlineText, enrollmentUnderlineXStart, enrollmentYPosition);
    doc.line(enrollmentUnderlineXStart, enrollmentUnderlineY + 2, enrollmentUnderlineXEnd, enrollmentUnderlineY + 2);
  
    // Capture department and semester from the state
    const departmentName = department; // From your input state
    const semesterName = semester; // From your input state
  
    // Add the statement about the bonafide student
    const bonafideText = `is a Bonafide student of this institute pursuing his/her study in  `;
  
    // Add bonafide text
    const bonafideXPosition = 20; // X position for justification
    const bonafideYPosition = enrollmentYPosition + lineSpacing; // Adjust Y position after enrollment number
    doc.setFontSize(16);
    doc.text(bonafideText, bonafideXPosition, bonafideYPosition, { maxWidth: doc.internal.pageSize.getWidth() - 40 });
  
    // Underline department name
    const departmentUnderlineXStart = bonafideXPosition + doc.getTextWidth(bonafideText);
    const departmentUnderlineXEnd = departmentUnderlineXStart + doc.getTextWidth(departmentName);
    doc.text(departmentName, departmentUnderlineXStart, bonafideYPosition);
    doc.line(departmentUnderlineXStart, bonafideYPosition + 2, departmentUnderlineXEnd, bonafideYPosition + 2);
  
    // Prepare the semester phrase with suffix
    const semesterPhrase = `${semesterName} semester.`;
    const semesterText = ` Engineering/Technology during academic year 202 -202 in `;
  
    // Add semester information
    const semesterYPosition = bonafideYPosition + lineSpacing; // Adjust Y position for semester text
    doc.text(semesterText, bonafideXPosition, semesterYPosition, { maxWidth: doc.internal.pageSize.getWidth() - 40 });
  
    // Underline the entire semester phrase (including suffix)
    const semesterUnderlineXStart = bonafideXPosition + doc.getTextWidth(semesterText);
    const semesterUnderlineXEnd = semesterUnderlineXStart + doc.getTextWidth(semesterPhrase);
    doc.text(semesterPhrase, semesterUnderlineXStart, semesterYPosition);
    doc.line(semesterUnderlineXStart, semesterYPosition + 2, semesterUnderlineXEnd, semesterYPosition + 2);
  
    // Add additional space (30 units) after the semester information
    const additionalSpace = 0; // Extra space after semester
    const adjustedSemesterYPosition = semesterYPosition + additionalSpace;
  
    // Calculate Y position for the last exam statement
    const lastExamYPosition: number = adjustedSemesterYPosition + lineSpacing; // Adjust based on previous calculations
  
    // Add 1 empty line before the moral character statement
    const moralCharacterEmptyLines = 1 * lineSpacing; // Renamed to avoid conflict
    const moralCharacterYPosition: number = lastExamYPosition + moralCharacterEmptyLines; // Calculate Y position for the moral character text
  
    // Create the moral character statement
    const moralCharacterText: string = "To the best of my knowledge, he/she bears a good moral character.";
    const lastExamStatement: string = `Last Exam Attended: `; // Modified the statement to separate lastExam for underlining
  
    // Render the moral character statement
    doc.text(moralCharacterText, bonafideXPosition, moralCharacterYPosition, { maxWidth: doc.internal.pageSize.getWidth() - 40, align: 'justify' });
  
    // Calculate Y position for the last exam statement
    const lastExamStatementYPosition: number = moralCharacterYPosition + lineSpacing; // Adjust Y position for last exam statement
    doc.text(lastExamStatement, bonafideXPosition, lastExamStatementYPosition, { maxWidth: doc.internal.pageSize.getWidth() - 40, align: 'justify' });
  
    // Underline the "Last Exam" value
    const lastExamXPosition = bonafideXPosition + doc.getTextWidth(lastExamStatement); // Positioning after "Last Exam Attended: "
    doc.text(lastExam, lastExamXPosition, lastExamStatementYPosition);
  
    // Underline the last exam value
    const lastExamUnderlineXEnd = lastExamXPosition + doc.getTextWidth(lastExam);
    doc.line(lastExamXPosition, lastExamStatementYPosition + 2, lastExamUnderlineXEnd, lastExamStatementYPosition + 2);
  
    // Add two empty lines before the Date
    const dateEmptyLines = 5 * lineSpacing; // Renamed to avoid conflict
    const dateYPosition: number = lastExamStatementYPosition + dateEmptyLines; // Calculate Y position for the date
  
    // Add "Date:" at the left side (hardcoded)
    const dateText: string = "Date:";
    doc.text(dateText, bonafideXPosition, dateYPosition); // Position at the left side using bonafideXPosition

    // Add one line of space
    const placeYPosition = dateYPosition + lineSpacing; // Adjust the Y position for the "Place:" text

    // Add "Place:" at the left side (hardcoded)
    const placeText: string = "Place:V.V Nagar";
    doc.text(placeText, bonafideXPosition, placeYPosition); // Position at the left side using bonafideXPosition

    // Center the "Seal:" inline with "Place:"
    const sealText: string = "Seal";

    // Calculate the x-position to center "Seal:" in the middle of the page
    const pageWidth = doc.internal.pageSize.getWidth();
    const sealXPosition = (pageWidth - doc.getTextWidth(sealText)) / 2; // Center horizontally

    // Add "Seal:" at the calculated position
    doc.text(sealText, sealXPosition, placeYPosition); // Same Y position as "Place:"

    // Add "Principal" at the right side of the page
    const principalText: string = "Principal";
    const principalXPosition = pageWidth - doc.getTextWidth(principalText) - 20; // Adjust the margin as needed
    doc.text(principalText, principalXPosition, placeYPosition); // Same Y position as "Place:" and "Seal:"
    
    // Save the PDF and prompt the user to download it
    doc.save("bonafide_certificate.pdf");
  };
  
  
  
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome To BBIT's Online Bonafide Certificate Generator
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="fullname">Full name As per 10th Marksheet</Label>
            <Input
              id="fullname"
              placeholder=""
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </LabelInputContainer>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="enrollment">Enrollment Number</Label>
            <Input
              id="enrollment"
              placeholder="246040307001"
              type="text"
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value)}
            />
          </LabelInputContainer>

          <span className="text-white">Or</span>

          <LabelInputContainer>
            <Label htmlFor="collegeId">College ID</Label>
            <Input
              id="collegeId"
              placeholder="G24CP01"
              type="text"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}

        <LabelInputContainer className="mb-4">
          <Label htmlFor="department">Department Name</Label>
          <Input
            id="department"
            placeholder="Computer"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="semester">Semester</Label>
          <Input
            id="semester"
            placeholder="1"
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="exam">Last Exam Attended</Label>
          <Input
            id="exam"
            placeholder="2023"
            type="number"
            value={lastExam}
            onChange={(e) => setLastExam(e.target.value)}
            required
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
          type="submit"
        >
          Generate Bonafide Certificate &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

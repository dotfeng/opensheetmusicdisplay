﻿import {IGraphicalSymbolFactory} from "../../Interfaces/IGraphicalSymbolFactory";
import {GraphicalMusicPage} from "../GraphicalMusicPage";
import {MusicSystem} from "../MusicSystem";
import {VexFlowMusicSystem} from "./VexFlowMusicSystem";
import {Staff} from "../../VoiceData/Staff";
import {StaffLine} from "../StaffLine";
import {VexFlowStaffLine} from "./VexFlowStaffLine";
import {SourceMeasure} from "../../VoiceData/SourceMeasure";
import {StaffMeasure} from "../StaffMeasure";
import {VexFlowMeasure} from "./VexFlowMeasure";
import {SourceStaffEntry} from "../../VoiceData/SourceStaffEntry";
import {GraphicalStaffEntry} from "../GraphicalStaffEntry";
import {VexFlowStaffEntry} from "./VexFlowStaffEntry";
import {Note} from "../../VoiceData/Note";
import {ClefInstruction} from "../../VoiceData/Instructions/ClefInstruction";
import {OctaveEnum} from "../../VoiceData/Expressions/ContinuousExpressions/octaveShift";
import {GraphicalNote} from "../GraphicalNote";
import {Pitch} from "../../../Common/DataObjects/pitch";
import {TechnicalInstruction} from "../../VoiceData/Instructions/TechnicalInstruction";
export class VexFlowGraphicalSymbolFactory implements IGraphicalSymbolFactory {
    /**
     * Create a new music system for the given page.
     * Currently only one vertically endless page exists where all systems are put to.
     * @param page
     * @param systemIndex
     * @returns {VexFlowMusicSystem}
     */
    public createMusicSystem(page: GraphicalMusicPage, systemIndex: number): MusicSystem {
        return new VexFlowMusicSystem(page, systemIndex);
    }

    /**
     * Create a staffline object containing all staff measures belonging to a given system and staff.
     * @param parentSystem
     * @param parentStaff
     * @returns {VexFlowStaffLine}
     */
    public createStaffLine(parentSystem: MusicSystem, parentStaff: Staff): StaffLine {
        return new VexFlowStaffLine(parentSystem, parentStaff);
    }

    /**
     * Construct an empty staffMeasure from the given source measure and staff.
     * @param sourceMeasure
     * @param staff
     * @returns {VexFlowMeasure}
     */
    public createStaffMeasure(sourceMeasure: SourceMeasure, staff: Staff): StaffMeasure {
        let measure: VexFlowMeasure = new VexFlowMeasure(staff, null, sourceMeasure);
        return measure;
    }

    /**
     * Create empty measure, which will be used to show key, rhythm changes at the end of the system.
     * @param staffLine
     * @returns {VexFlowMeasure}
     */
    public createExtraStaffMeasure(staffLine: StaffLine): StaffMeasure {
        let measure: VexFlowMeasure = new VexFlowMeasure(staffLine.ParentStaff, staffLine);
        return measure;
    }

    /**
     * Create a staffEntry in the given measure for a given sourceStaffEntry.
     * @param sourceStaffEntry
     * @param measure
     * @returns {VexFlowStaffEntry}
     */
    public createStaffEntry(sourceStaffEntry: SourceStaffEntry, measure: StaffMeasure): GraphicalStaffEntry {
        return new VexFlowStaffEntry(<VexFlowMeasure>measure, sourceStaffEntry, undefined);
    }

    /**
     * Create an empty staffEntry which will be used for grace notes.
     * it will be linked to the given staffEntryParent, which is a staffEntry for normal notes.
     * Grace notes are always given before (rarely also after) normal notes.
     * @param staffEntryParent
     * @param measure
     * @returns {VexFlowStaffEntry}
     */
    public createGraceStaffEntry(staffEntryParent: GraphicalStaffEntry, measure: StaffMeasure): GraphicalStaffEntry {
        return new VexFlowStaffEntry(<VexFlowMeasure>measure, undefined, <VexFlowStaffEntry>staffEntryParent);
    }

    /**
     * Create a Graphical Note for given note and clef and as part of graphicalStaffEntry.
     * @param note
     * @param numberOfDots  The number of dots the note has to increase its musical duration.
     * @param graphicalStaffEntry
     * @param activeClef    The currently active clef, needed for positioning the note vertically
     * @param octaveShift   The currently active octave transposition enum, needed for positioning the note vertically
     * @returns {GraphicalNote}
     */
    public createNote(note: Note, numberOfDots: number, graphicalStaffEntry: GraphicalStaffEntry, activeClef: ClefInstruction, octaveShift: OctaveEnum = OctaveEnum.NONE): GraphicalNote {
        let gn: GraphicalNote = new GraphicalNote(note, graphicalStaffEntry);
        return gn;
    }

    /**
     * Create a Graphical Grace Note (smaller head, stem...) for given note and clef and as part of graphicalStaffEntry.
     * @param note
     * @param numberOfDots
     * @param graphicalStaffEntry
     * @param activeClef
     * @param octaveShift
     * @returns {GraphicalNote}
     */
    public createGraceNote(note: Note, numberOfDots: number, graphicalStaffEntry: GraphicalStaffEntry, activeClef: ClefInstruction, octaveShift: OctaveEnum = OctaveEnum.NONE): GraphicalNote {
        let gn: GraphicalNote = new GraphicalNote(note, graphicalStaffEntry);
        return gn;
    }

    /**
     * Adds an accidental to a graphical note.
     * @param graphicalNote
     * @param pitch
     * @param grace
     * @param graceScalingFactor
     */
    public addGraphicalAccidental(graphicalNote: GraphicalNote, pitch: Pitch, grace: boolean, graceScalingFactor: number): void {

    }

    /**
     * Adds a Fermata symbol at the last note of the given tied Note.
     * The last graphical note of this tied note is located at the given graphicalStaffEntry.
     * A Fermata has to be located at the last tied note.
     * @param tiedNote
     * @param graphicalStaffEntry
     */
    public addFermataAtTiedEndNote(tiedNote: Note, graphicalStaffEntry: GraphicalStaffEntry): void {

    }

    /**
     * Adds a technical instruction at the given staff entry.
     * @param technicalInstruction
     * @param graphicalStaffEntry
     */
    public createGraphicalTechnicalInstruction(technicalInstruction: TechnicalInstruction, graphicalStaffEntry: GraphicalStaffEntry): void {

    }

    /**
     * Adds a clef change within a measure before the given staff entry.
     * @param graphicalStaffEntry
     * @param clefInstruction
     */
    public createInStaffClef(graphicalStaffEntry: GraphicalStaffEntry, clefInstruction: ClefInstruction): void {

    }

    /**
     * Adds a chord symbol at the given staff entry
     * @param sourceStaffEntry
     * @param graphicalStaffEntry
     * @param transposeHalftones
     */
    public createChordSymbol(sourceStaffEntry: SourceStaffEntry, graphicalStaffEntry: GraphicalStaffEntry, transposeHalftones: number): void {

    }
}
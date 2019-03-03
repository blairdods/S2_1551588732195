/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://beta.skaffolder.com/#!/register?friend=5c7b5d0a8cc2881127fbfb10
*
* You will get 10% discount for each one of your friends
* 
*/
// Import Libraries
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
// Import Services
import { ReportsService } from '../../services/reports.service';
// Import Models
import { Reports } from '../../domain/s2_db/reports';

// START - USED SERVICES
/**
* ReportsService.create
*	@description CRUD ACTION create
*
* ReportsService.get
*	@description CRUD ACTION get
*	@param ObjectId id Id 
*
* ReportsService.update
*	@description CRUD ACTION update
*	@param ObjectId id Id
*
*/
// END - USED SERVICES

/**
 * This component allows to edit a Reports
 */
@Component({
    selector: 'app-reports-edit',
    templateUrl: 'reports-edit.component.html',
    styleUrls: ['reports-edit.component.css']
})
export class ReportsEditComponent implements OnInit {
    item: Reports;
    model: Reports;
    formValid: Boolean;

    constructor(
    private reportsService: ReportsService,
    private route: ActivatedRoute,
    private location: Location) {
        // Init item
        this.item = new Reports();
    }

    /**
     * Init
     */
    ngOnInit() {
        this.route.params.subscribe(param => {
            const id: string = param['id'];
            if (id !== 'new') {
                this.reportsService.get(id).subscribe(item => this.item = item);
            }
            // Get relations
        });
    }


    /**
     * Save Reports
     *
     * @param {boolean} formValid Form validity check
     * @param Reports item Reports to save
     */
    save(formValid: boolean, item: Reports): void {
        this.formValid = formValid;
        if (formValid) {
            if (item._id) {
                this.reportsService.update(item).subscribe(data => this.goBack());
            } else {
                this.reportsService.create(item).subscribe(data => this.goBack());
            } 
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }


}




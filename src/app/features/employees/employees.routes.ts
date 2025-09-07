import {Routes} from "@angular/router";
import {EmployeesLayoutComponent} from "./employees-layout/employees-layout.component";
import {ReviewModerationComponent} from "./employees.components/review-moderation/review-moderation.component";
import {ProblemRidesComponent} from "./employees.components/problem-rides/problem-rides.component";
import {ModerationGuideComponent} from "./employees.components/moderation-guide/moderation-guide.component";
import {StatsComponent} from "./employees.components/stats/stats.component";

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    component: EmployeesLayoutComponent,
    children: [
      { path: '', redirectTo: 'moderation', pathMatch: 'full'},
      { path: 'moderation', component: ReviewModerationComponent },
      { path: 'signalements', component: ProblemRidesComponent },
      { path: 'guide', component: ModerationGuideComponent },
      { path: 'stats', component: StatsComponent },
    ]
  }
]

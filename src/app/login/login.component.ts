import { CryptService } from './../services/crypt.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AuthService } from './../services/auth.service';
import { ConfigService } from './../services/config.services';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  email: string;
  password: string;
  isSubmitting: boolean = false;
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private cryptService: CryptService,
    protected storage: StorageMap
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isSubmitting = true;
    this.configService.toggleLoading(true);
    this.authService.doAdminLogin(this.email, this.password).subscribe(
      (response) => {
        if (response.status == 200) {
          this.cryptService
            .encryptData(response.data.admin)
            .then((encryptedAdminData) => {
              this.storage.set('admin', encryptedAdminData).subscribe(() => {
                // this.configService.redirect('/dashboard');
                this.storage
                  .get('admin', { type: 'string' })
                  .subscribe((data) => {
                    this.cryptService
                      .decryptData(data)
                      .then((e) => console.log(e));
                    this.storage.set('admins', encryptedAdminData);
                  });
              });
            });
        } else {
          this.configService.openSnackBar({
            data: {
              message: response.message,
              err: false,
            },
          });
        }
      },
      (err) => {
        this.isSubmitting = false;
        this.configService.toggleLoading(false);
        this.configService.openSnackBar({
          data: {
            message: err,
            err: true,
          },
        });
      },
      () => {
        this.isSubmitting = false;
        this.configService.toggleLoading(false);
      }
    );
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';

import { Response } from 'express';

import { ErrorCodes } from '@domains/enums/error-codes.enum';
import { IError } from '@domains/models/error.model';

import { BannerResourceNotFoundException } from '@controllers/banner/errors/banner-not-found.exception';
import { BlogSectionResourceNotFoundException } from '@controllers/blog-section/errors/blog-section-not-found.exception';
import { BlogSectionResourceMissingArticleRelationshipException } from '@controllers/blog-section/errors/missing-article-blog-section.exception';
import { CampaignResourceEndBeforeStartDateException } from '@controllers/campaign/errors/campaign-resource-end-before-start-date.error';
import { CampaignResourceNotFoundException } from '@controllers/campaign/errors/campaign-resource-not-found.error';
import { CategoryNotFoundException } from '@controllers/category/errors/category-not-found.error';
import { CategoryParentCategoryIdDoesNotExistException } from '@controllers/category/errors/category-parent-category-id-doesnt-exist.error';
import { CategoryParentCategoryMustBeDifferentException } from '@controllers/category/errors/category-parent-category-must-be-different.error';
import { CategoryTitleAlreadyExistsException } from '@controllers/category/errors/category-title-already-exists.error';
import { CommentParentCommentIdDoesNotExistException } from '@controllers/comment/errors/comment-parent-comment-id-does-not-exist.error';
import { CommentRelationMissException } from '@controllers/comment/errors/comment-relation-miss.error';
import { CommentResourceNotFoundException } from '@controllers/comment/errors/comment-resource-not-found.error';
import { BatchUploadErroFileNotFoundException } from '@controllers/company/errors/batch-upload-error-file-not-found.exception';
import { BatchUploadInvalidEmail } from '@controllers/company/errors/batch-upload-invalid-email.exception';
import { CompanyResourceAlreadyExistsException } from '@controllers/company/errors/company-already-exists.exception';
import { CompanyResourceNotFoundException } from '@controllers/company/errors/company-not-found.exception';
import { MissCompanyEnrollmentException } from '@controllers/company/errors/miss-company-enrollment.exception';
import { ContractResourceAlreadyExistsException } from '@controllers/contract/errors/contract-already-exists.exception';
import { ContractResourceAlreadySignedException } from '@controllers/contract/errors/contract-already-signed.exception';
import { ContractResourceNotFoundException } from '@controllers/contract/errors/contract-not-found.exception';
import { CourseNotFoundException } from '@controllers/course/errors/course-not-found.error';
import { CourseTitleAlreadyExistsException } from '@controllers/course/errors/course-title-alreay-exists.error';
import { MissingCourseRelationshipException } from '@controllers/course/errors/missing-course-relationship.error';
import { CourseActivityFeedbackAlreadyExistsException } from '@controllers/course-activity-feedbacks/errors/course-activity-feedback-already-exists.error';
import { CourseActivityFeedbackNotFoundException } from '@controllers/course-activity-feedbacks/errors/course-activity-feedback-not-found.error';
import { CertificationNotFoundException } from '@controllers/course-certification/errors/certification-not-found.exception';
import { CourseCertificationResourceNotFoundException } from '@controllers/course-certification/errors/course-certification-not-found.exception';
import { LectureStopTimeNotFoundException } from '@controllers/course-chapter/lecture/errors/lecture-stop-time-not-found.exception';
import { CourseComboNotFoundException } from '@controllers/course-combo/errors/course-combo-not-found.exception';
import { ExamResourceMaxAttemptsExceededException } from '@controllers/exam/errors/exam-max-attempts-exceeded.exception';
import { ExamResourceNotAnsweredException } from '@controllers/exam/errors/exam-not-answered.exception';
import { FaqCategoriesRelationMissException } from '@controllers/faq-categories/errors/faq-category-relation-miss.error';
import { FaqCategoryResourceNotFoundException } from '@controllers/faq-categories/errors/faq-category-resource-not-found.error';
import { FaqResourceNotFoundException } from '@controllers/faqs/errors/faq-resource-not-found.error';
import { FavoriteResourceAlreadyExistsException } from '@controllers/favorite/errors/favorite-resource-already-exists.exception';
import { FavoriteResourceNotFoundException } from '@controllers/favorite/errors/favorite-resource-not-found.error';
import { FavoriteResourceRelationMissException } from '@controllers/favorite/errors/favorite-resource-relation-miss.exception';
import { FileResourceNotAllowedException } from '@controllers/files/errors/file-resource-not-allowed.exception';
import { FileResourceNotFoundException } from '@controllers/files/errors/file-resource-not-found.exception';
import { FileTypeException } from '@controllers/files/errors/file-type.exception';
import { CostCenterNotFoundException } from '@controllers/financial/errors/cost-center-not-found.exception';
import { HomeCoursesSectionNotFoundException } from '@controllers/home-courses-section/errors/home-courses-section-not-found.exception';
import { MissingCourseHomeCoursesSectionException } from '@controllers/home-courses-section/errors/missing-courses-home-courses-section.exception';
import { MissingHomeCourseSectionException } from '@controllers/home-courses-section/errors/missing-home-course-section.exception';
import { LeadAlreadyConvertedException } from '@controllers/leads/errors/lead-already-converted.exception';
import { LeadResourceNotFoundException } from '@controllers/leads/errors/lead-not-found.exception';
import { PartnerResourceNotFoundException } from '@controllers/partner/errors/partner-not-found.exception';
import { PartnerSectionResourceMissingPartnerRelationshipException } from '@controllers/partner-section/errors/missing-relation-partner-section.exception';
import { PartnerSectionResourceNotFoundException } from '@controllers/partner-section/errors/partner-section-not-found.exception';
import { PasswordTokenExpiredException } from '@controllers/passwords/errors/password-token-expired.error';
import { PasswordTokenNotExistsException } from '@controllers/passwords/errors/password-token-not-exists.error';
import { BilletMethodUnavailable } from '@controllers/payment/errors/billet-method-unavailable.exception';
import { BilletResourceNotGeneratedException } from '@controllers/payment/errors/billet-not-generated.exception';
import { CouponNotFoundException } from '@controllers/payment/errors/coupon-not-found.error';
import { CourseAlreadyBought } from '@controllers/payment/errors/course-already-bought.exception';
import { CreditCardMethodUnavailable } from '@controllers/payment/errors/credit-card-method-unavailable.exception';
import { InvalidAIATokenException } from '@controllers/payment/errors/invalid-aia-token.exception';
import { InvalidCreditCardException } from '@controllers/payment/errors/invalid-credit-card.exception';
import { LMSCourseIdNotFilled } from '@controllers/payment/errors/lms-course-id-not-filled.error';
import { PaymentIsNotABilletException } from '@controllers/payment/errors/not-billet-payment.error';
import { PaymentNotFoundException } from '@controllers/payment/errors/payment-not-found.error';
import { PaymentResourceNotPaidException } from '@controllers/payment/errors/payment-not-paid.exception';
import { PaymentResourceNotRefundableException } from '@controllers/payment/errors/payment-not-refundable.exception';
import { PaymentPlanResourceNotFoundException } from '@controllers/payment/errors/payment-plan-not-found.exception';
import { PaymentRefundResourceInProgressException } from '@controllers/payment/errors/payment-refund-in-progress.exception';
import { RefundAmountExceedsPaidValueException } from '@controllers/payment/errors/refund-amount-exceeds-paid-value.error';
import { UserAlreadyHasSubscriptionException } from '@controllers/payment/errors/user-already-has-subscription.exception';
import { WrongUserPaymentException } from '@controllers/payment/errors/wrong-user-payment.error';
import { PostCategoryRelationMissException } from '@controllers/post-categories/errors/post-category-relation-miss.error';
import { PostCategoryResourceNotFoundException } from '@controllers/post-categories/errors/post-category-resource-not-found.error';
import { PostCategoryTitleAlreadyExistsException } from '@controllers/post-categories/errors/post-category-title-already-exists.error';
import { BlogPostResourceAlreadyExistsException } from '@controllers/posts/errors/post-resource-already-exists.error';
import { BlogPostResourceNotFoundException } from '@controllers/posts/errors/post-resource-not-found.error';
import { ReportDataNotFoundException } from '@controllers/reports/errors/report-data-not-found.error';
import { ReportFileSizeLimitExceededException } from '@controllers/reports/errors/report-file-size-limit-exceeded.error';
import { ReportRowLimitExceededException } from '@controllers/reports/errors/report-row-limit-exceeded.error';
import { InvalidCredentialsException } from '@controllers/sessions/errors/invalid-credentials.error';
import { InvalidPasswordException } from '@controllers/sessions/errors/invalid-password.exception';
import { PasswordResourceOutdatedException } from '@controllers/sessions/errors/password-outdated.error';
import { SearchDocumentNotDeletedException } from '@controllers/shared/jobs/errors/document-not-deleted-job.exception';
import { SocialMediaPostResourceNotFoundException } from '@controllers/social-media-post/errors/social-media-post-not-found.exception';
import { TeacherRoleResourceNotFoundException } from '@controllers/teacher-roles/errors/teacher-role-resource-not-found.exception';
import { TeacherTagAlreadyExistsException } from '@controllers/teacher-tag/errors/teacher-tag-already-exists.exception';
import { TeacherTagNotFoundException } from '@controllers/teacher-tag/errors/teacher-tag-not-found.exception';
import { MentorScheduleResourceMustBeUniqueException } from '@controllers/teachers/errors/mentor/mentor-schedule-must-be-unique.exception';
import { TeacherResourceMentorshipRelationMissException } from '@controllers/teachers/errors/mentor/teacher-mentorship-relation-miss.exception';
import { TeacherResourceNotFoundException } from '@controllers/teachers/errors/teacher-resource-not-found.exception';
import { TeacherRoleRelationMissException } from '@controllers/teachers/errors/teacher-role-relation-miss.exception';
import { CPFAlreadyExistsException } from '@controllers/users/errors/cpf-already-exists.exception';
import { EmailResourceAlreadyExistsException } from '@controllers/users/errors/email-resource-already-exists.error';
import { EnrollmentResourceTrialNotAllowedException } from '@controllers/users/errors/enrollment-trial-not-allowed.exception';
import { InvalidEmailException } from '@controllers/users/errors/invalid-email.exception';
import { InvalidUserOTVTokenResourceException } from '@controllers/users/errors/invalid-user-otv-token.exception';
import { PasswordConfirmationException } from '@controllers/users/errors/password-confirmation.error';
import { UserAccountResourceNotCompletedException } from '@controllers/users/errors/user-account-not-completed.exception';
import { UserResourceExceedsCountException } from '@controllers/users/errors/user-exceeds-count.exception';
import { UserNotAuthorizedException } from '@controllers/users/errors/user-not-authorized.error';
import { UserNotFoundException } from '@controllers/users/errors/user-not-found.error';
import { UserPermissionResourceNotFoundException } from '@controllers/users/errors/user-permission-not-found.exception';
import { UserRoleNotAuthorizedException } from '@controllers/users/errors/user-role-not-authorized.error';
import { UserRoleNotFoundException } from '@controllers/users/errors/user-role-not-found.error';

import { CompanySquadResourceNotFoundException } from '@graphql/errors/company/company-squad-not-found.exception';
import { CourseChapterContentResourceNotFoundException } from '@graphql/errors/course-chapter/course-chapter-content-not-found.exception';
import { CourseChapterResourceNotFoundException } from '@graphql/errors/course-chapter/course-chapter-not-found.exception';
import { CourseFeedbackResourceAlreadyExistsException } from '@graphql/errors/course-feedback/course-feedback-already-exists.exception';
import { EnrollmentResourceBoundaryException } from '@graphql/errors/enrollment/enrollment-boundary.exception';
import { EnrollmentResourceNotFoundException } from '@graphql/errors/enrollment/enrollment-not-found.exception';
import { InactiveCourseEnrollException } from '@graphql/errors/enrollment/inactive-course-enroll.exception';
import { InvalidExpirationDateException } from '@graphql/errors/enrollment/invalid-expiration-date.exception';
import { EnrollmentLicensesResourceLessThanUsedException } from '@graphql/errors/enrollment/licenses-count-less-than-used.exception';
import { ExamResourceNotEnoughQuestionsException } from '@graphql/errors/exam/exam-not-enough-questions.exception';
import { ExamResourceNotFoundException } from '@graphql/errors/exam/exam-not-found.exceptions';
import { PaymentBenefitResourceNotFoundException } from '@graphql/errors/payment-benefit/payment-benefit-not-found.exception';
import { CouponResourceAlreadyExistsException } from '@graphql/errors/payment-coupon/coupon-already-exists.exception';
import { CouponResourceEndBeforeStartDateException } from '@graphql/errors/payment-coupon/coupon-end-before-start-date.exception';
import { CouponResourceQuantityLessThanUsedException } from '@graphql/errors/payment-coupon/coupon-quantity-less-then-used.exception';
import { DeleteUsedCouponException } from '@graphql/errors/payment-coupon/delete-used-coupon.exception';
import { StudyPlanResourceNotFoundException } from '@graphql/errors/study-plan/study-plan-not-found.exception';
import { UserLectureNoteNotFoundException } from '@graphql/errors/user-lecture-note/user-lecture-note-not-found.exception';
import { CourseActivityResourceAlreadyCompletedException } from '@graphql/errors/user-progress/course-activity-already-completed.exception';

import { ExternalProviderException } from './external-provider.exception';
import { InternalServerErrorException } from './internal-server-error.error';
import { JobRegistrationTimeoutException } from './job-registration-timeout.exception';
import { OperationNotPermittedException } from './operation-not-permitted.exception';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: IError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    const ctx = gqlHost.switchToHttp();
    const response = ctx.getResponse<Response>();
    const logger = new Logger(exception.code || ExceptionsFilter.name);

    logger.error(exception);

    try {
      switch (exception.code) {
        // * Job
        case ErrorCodes.REGISTRATION_TIMEOUT:
          throw new JobRegistrationTimeoutException();

        // * User
        case ErrorCodes.EMAIL_EXISTS:
          throw new EmailResourceAlreadyExistsException();

        case ErrorCodes.USER_NOT_FOUND:
          throw new UserNotFoundException();

        case ErrorCodes.USER_NOT_AUTHORIZED:
          throw new UserNotAuthorizedException();

        case ErrorCodes.USER_ROLE_NOT_FOUND:
          throw new UserRoleNotFoundException();

        case ErrorCodes.USER_ROLE_NOT_AUTHORIZED:
          throw new UserRoleNotAuthorizedException();

        case ErrorCodes.PASS_CONFIRM:
          throw new PasswordConfirmationException();

        case ErrorCodes.USER_PERMISSION_NOT_FOUND:
          throw new UserPermissionResourceNotFoundException();

        case ErrorCodes.USER_ACCOUNT_NOT_COMPLETED:
          throw new UserAccountResourceNotCompletedException();

        case ErrorCodes.USER_OTV_INVALID_TOKEN:
          throw new InvalidUserOTVTokenResourceException();

        case ErrorCodes.USER_EXCEEDS_COUNT:
          throw new UserResourceExceedsCountException();

        // * Password
        case ErrorCodes.PASS_TOKEN_EXP:
          throw new PasswordTokenExpiredException();

        case ErrorCodes.PASS_TOKEN_NOT_EXISTS:
          throw new PasswordTokenNotExistsException();

        case ErrorCodes.PASS_OUTDATED:
          throw new PasswordResourceOutdatedException();

        case ErrorCodes.INVALID_PASSWORD:
          throw new InvalidPasswordException();

        // * Session
        case ErrorCodes.INVALID_CREDENTIALS:
          throw new InvalidCredentialsException();

        // * Teacher
        case ErrorCodes.TEACHER_NOT_FOUND:
          throw new TeacherResourceNotFoundException();

        case ErrorCodes.TEACHER_ROLE_NOT_FOUND:
          throw new TeacherRoleResourceNotFoundException();

        case ErrorCodes.TEACHER_ROLE_RELATION_MISS:
          throw new TeacherRoleRelationMissException();

        case ErrorCodes.TEACHER_MENTORSHIP_AREA_RELATION_MISS:
          throw new TeacherResourceMentorshipRelationMissException();

        case ErrorCodes.TEACHER_MENTOR_SCHEDULE_MUST_BE_UNIQUE:
          throw new MentorScheduleResourceMustBeUniqueException();

        // * File
        case ErrorCodes.FILE_NOT_ALLOWED:
          throw new FileResourceNotAllowedException();

        case ErrorCodes.FILE_NOT_FOUND:
          throw new FileResourceNotFoundException();

        case ErrorCodes.FILE_TYPE:
          throw new FileTypeException();

        // * FAQ
        case ErrorCodes.FAQ_NOT_FOUND:
          throw new FaqResourceNotFoundException();

        case ErrorCodes.FAQ_CAT_NOT_FOUND:
          throw new FaqCategoryResourceNotFoundException();

        case ErrorCodes.FAQ_CAT_RELATION_MISS:
          throw new FaqCategoriesRelationMissException();

        // * Post Category
        case ErrorCodes.BLOG_POST_CAT_NOT_FOUND:
          throw new PostCategoryResourceNotFoundException();

        case ErrorCodes.BLOG_POST_CAT_TITLE_ALREADY_EXISTS:
          throw new PostCategoryTitleAlreadyExistsException();

        case ErrorCodes.BLOG_POST_CAT_RELATION_MISS:
          throw new PostCategoryRelationMissException();

        // * Blog post
        case ErrorCodes.BLOG_POST_ALREADY_EXISTS:
          throw new BlogPostResourceAlreadyExistsException();

        case ErrorCodes.BLOG_POST_NOT_FOUND:
          throw new BlogPostResourceNotFoundException();

        // * Category
        case ErrorCodes.CATEGORY_NOT_FOUND:
          throw new CategoryNotFoundException();

        case ErrorCodes.CATEGORY_PARENT_CATEGORY_DOES_NOT_EXIST:
          throw new CategoryParentCategoryIdDoesNotExistException();

        case ErrorCodes.CATEGORY_TITLE_ALREADY_EXISTS:
          throw new CategoryTitleAlreadyExistsException();

        case ErrorCodes.CATEGORY_PARENT_CATEGORY_MUST_BE_DIFFERENT:
          throw new CategoryParentCategoryMustBeDifferentException();

        // * Course
        case ErrorCodes.COURSE_NOT_FOUND:
          throw new CourseNotFoundException();

        case ErrorCodes.COURSE_TITLE_ALREADY_EXISTS:
          throw new CourseTitleAlreadyExistsException();

        case ErrorCodes.COURSE_CHAPTER_CONTENT_NOT_FOUND:
          throw new CourseChapterContentResourceNotFoundException();

        case ErrorCodes.COURSE_CHAPTER_NOT_FOUND:
          throw new CourseChapterResourceNotFoundException();

        // * Comment
        case ErrorCodes.COMMENT_NOT_FOUND:
          throw new CommentResourceNotFoundException();

        case ErrorCodes.COMMENT_PARENT_COMMENT_ID_DOES_NOT_EXISTS:
          throw new CommentParentCommentIdDoesNotExistException();

        case ErrorCodes.COMMENT_RELATION_MISS:
          throw new CommentRelationMissException();

        // * Favorite
        case ErrorCodes.FAVORITE_NOT_FOUND:
          throw new FavoriteResourceNotFoundException();

        case ErrorCodes.FAVORITE_ALREADY_EXISTS:
          throw new FavoriteResourceAlreadyExistsException();

        case ErrorCodes.FAVORITE_RELATION_MISS:
          throw new FavoriteResourceRelationMissException();

        // * Campaign
        case ErrorCodes.CAMPAIGN_NOT_FOUND:
          throw new CampaignResourceNotFoundException();

        case ErrorCodes.CAMPAIGN_END_BEFORE_START_DATE:
          throw new CampaignResourceEndBeforeStartDateException();

        // * Payments
        case ErrorCodes.PAYMENT_LMS_COURSE_ID_NOT_FILLED:
          throw new LMSCourseIdNotFilled();

        case ErrorCodes.PAYMENT_COUPON_NOT_FOUND:
          throw new CouponNotFoundException();

        case ErrorCodes.PAYMENT_NOT_FOUND:
          throw new PaymentNotFoundException();

        case ErrorCodes.PAYMENT_WRONG_USER:
          throw new WrongUserPaymentException();

        case ErrorCodes.PAYMENT_NOT_BILLET:
          throw new PaymentIsNotABilletException();

        case ErrorCodes.PAYMENT_BILLET_METHOD_UNAVAILABLE:
          throw new BilletMethodUnavailable();

        case ErrorCodes.PAYMENT_CREDIT_CARD_METHOD_UNAVAILABLE:
          throw new CreditCardMethodUnavailable();

        case ErrorCodes.PAYMENT_COURSE_ALREADY_BOUGHT:
          throw new CourseAlreadyBought();

        case ErrorCodes.USER_CPF_ALREADY_EXISTS:
          throw new CPFAlreadyExistsException();

        case ErrorCodes.PAYMENT_PLAN_NOT_FOUND:
          throw new PaymentPlanResourceNotFoundException();

        case ErrorCodes.WRONG_AIA_TOKEN:
          throw new InvalidAIATokenException();

        case ErrorCodes.PAYMENT_NOT_PAID:
          throw new PaymentResourceNotPaidException();

        case ErrorCodes.PAYMENT_NOT_REFUNDABLE:
          throw new PaymentResourceNotRefundableException();

        case ErrorCodes.REFUND_AMOUNT_EXCEEDS:
          throw new RefundAmountExceedsPaidValueException();

        case ErrorCodes.PAYMENT_BILLET_NOT_GENERATED:
          throw new BilletResourceNotGeneratedException();

        case ErrorCodes.PAYMENT_USER_ALREADY_HAS_SUBSCRIPTION:
          throw new UserAlreadyHasSubscriptionException();

        case ErrorCodes.PAYMENT_INVALID_CREDIT_CARD:
          throw new InvalidCreditCardException();

        case ErrorCodes.PAYMENT_REFUND_IN_PROGRESS:
          throw new PaymentRefundResourceInProgressException();

        case ErrorCodes.PAYMENT_TRANSACTION_CRITICAL:
          throw new ExternalProviderException('Payment');

        // * Search Engine
        case ErrorCodes.SEARCH_DOCUMENT_NOT_DELETED:
          throw new SearchDocumentNotDeletedException();

        // * Home courses sections
        case ErrorCodes.HOME_COURSES_SECTION_NOT_FOUND:
          throw new HomeCoursesSectionNotFoundException();

        case ErrorCodes.HOME_COURSES_SECTION_MISSING_COURSE:
          throw new MissingCourseHomeCoursesSectionException();

        case ErrorCodes.HOME_COURSES_SECTION_MISSING:
          throw new MissingHomeCourseSectionException();

        // * Course combo
        case ErrorCodes.COURSE_COMBO_NOT_FOUND:
          throw new CourseComboNotFoundException();

        case ErrorCodes.MISSING_COURSE_RELATIONSHIP:
          throw new MissingCourseRelationshipException();

        // * Blog Section
        case ErrorCodes.BLOG_SECTION_NOT_FOUND:
          throw new BlogSectionResourceNotFoundException();

        case ErrorCodes.BLOG_SECTION_MISSING_ARTICLE:
          throw new BlogSectionResourceMissingArticleRelationshipException();

        // * Social Media Post
        case ErrorCodes.SOCIAL_MEDIA_POST_NOT_FOUND:
          throw new SocialMediaPostResourceNotFoundException();

        // * Partner
        case ErrorCodes.PARTNER_NOT_FOUND:
          throw new PartnerResourceNotFoundException();

        // * Partner Section
        case ErrorCodes.PARTNER_SECTION_NOT_FOUND:
          throw new PartnerSectionResourceNotFoundException();

        case ErrorCodes.PARTNER_SECTION_MISSING_RELATION:
          throw new PartnerSectionResourceMissingPartnerRelationshipException();

        // * Course Certification
        case ErrorCodes.COURSE_CERTIFICATION_NOT_FOUND:
          throw new CourseCertificationResourceNotFoundException();

        case ErrorCodes.USER_COURSE_CERTIFICATION_NOT_FOUND:
          throw new CertificationNotFoundException();

        // * Teacher Tags
        case ErrorCodes.TEACHER_TAG_NAME_ALREADY_EXISTS:
          throw new TeacherTagAlreadyExistsException();

        case ErrorCodes.TEACHER_TAG_NOT_FOUND:
          throw new TeacherTagNotFoundException();

        // * Company
        case ErrorCodes.COMPANY_NOT_FOUND:
          throw new CompanyResourceNotFoundException();

        case ErrorCodes.COMPANY_ALREADY_EXISTS:
          throw new CompanyResourceAlreadyExistsException();

        case ErrorCodes.COMPANY_BATCH_UPLOAD_MISS_ENROLLMENT:
          throw new MissCompanyEnrollmentException();

        case ErrorCodes.COMPANY_BATCH_UPLOAD_INVALID_EMAILS:
          throw new BatchUploadInvalidEmail(exception.data);

        case ErrorCodes.COMPANY_BATCH_NOT_FOUND:
          throw new BatchUploadErroFileNotFoundException();

        case ErrorCodes.COMPANY_SQUAD_NOT_FOUND:
          throw new CompanySquadResourceNotFoundException();

        // * Banner
        case ErrorCodes.BANNER_NOT_FOUND:
          throw new BannerResourceNotFoundException();

        // * Enrollments
        case ErrorCodes.ENROLLMENT_NOT_FOUND:
          throw new EnrollmentResourceNotFoundException();

        case ErrorCodes.ENROLLMENT_BOUNDARY_COURSE:
          throw new EnrollmentResourceBoundaryException();

        case ErrorCodes.ENROLLMENT_INACTIVE_COURSE:
          throw new InactiveCourseEnrollException();

        case ErrorCodes.ENROLLMENT_INVALID_EXPIRATION_DATE:
          throw new InvalidExpirationDateException();

        case ErrorCodes.ENROLLMENT_TRIAL_NOT_ALLOWED:
          throw new EnrollmentResourceTrialNotAllowedException();

        case ErrorCodes.ENROLLMENT_LICENSES_COUNT_LESS_THAN_USED:
          throw new EnrollmentLicensesResourceLessThanUsedException();

        // * User Progress
        case ErrorCodes.COURSE_ACTIVITY_ALREADY_COMPLETED:
          throw new CourseActivityResourceAlreadyCompletedException();

        // * Course Feedback
        case ErrorCodes.COURSE_FEEDBACK_ALREADY_EXISTS:
          throw new CourseFeedbackResourceAlreadyExistsException();

        // * Exam
        case ErrorCodes.EXAM_NOT_FOUND:
          throw new ExamResourceNotFoundException();

        case ErrorCodes.EXAM_NOT_ENOUGH_QUESTIONS:
          throw new ExamResourceNotEnoughQuestionsException();

        case ErrorCodes.EXAM_MAX_ATTEMPTS_EXCEEDED:
          throw new ExamResourceMaxAttemptsExceededException();

        case ErrorCodes.EXAM_NOT_ANSWERED:
          throw new ExamResourceNotAnsweredException();

        // * Contract
        case ErrorCodes.CONTRACT_NOT_FOUND:
          throw new ContractResourceNotFoundException();

        case ErrorCodes.CONTRACT_ALREADY_EXISTS:
          throw new ContractResourceAlreadyExistsException();

        case ErrorCodes.CONTRACT_ALREADY_SIGNED:
          throw new ContractResourceAlreadySignedException();

        // * Payment Benefit
        case ErrorCodes.PAYMENT_BENEFIT_NOT_FOUND:
          throw new PaymentBenefitResourceNotFoundException();

        // * Leads
        case ErrorCodes.LEAD_NOT_FOUND:
          throw new LeadResourceNotFoundException();

        case ErrorCodes.LEAD_ALREADY_CONVERTED:
          throw new LeadAlreadyConvertedException();

        // * Coupons
        case ErrorCodes.PAYMENT_COUPON_ALREADY_EXISTS:
          throw new CouponResourceAlreadyExistsException();

        case ErrorCodes.PAYMENT_COUPON_END_BEFORE_START_DATE:
          throw new CouponResourceEndBeforeStartDateException();

        case ErrorCodes.PAYMENT_COUPON_LESS_THAN_USED:
          throw new CouponResourceQuantityLessThanUsedException();

        case ErrorCodes.PAYMENT_COUPON_DELETE_USED:
          throw new DeleteUsedCouponException();

        // * Study Plan
        case ErrorCodes.STUDY_PLAN_NOT_FOUND:
          throw new StudyPlanResourceNotFoundException();

        case ErrorCodes.COURSE_ACTIVITY_FEEDBACK_ALREADY_EXISTS:
          throw new CourseActivityFeedbackAlreadyExistsException();

        case ErrorCodes.COURSE_ACTIVITY_FEEDBACK_NOT_FOUND:
          throw new CourseActivityFeedbackNotFoundException();

        // * Reports
        case ErrorCodes.REPORT_DATA_NOT_FOUND:
          throw new ReportDataNotFoundException();

        case ErrorCodes.REPORT_FILE_SIZE_LIMIT_EXCEEDED:
          throw new ReportFileSizeLimitExceededException();

        case ErrorCodes.REPORT_ROW_LIMIT_EXCEEDED:
          throw new ReportRowLimitExceededException();

        case ErrorCodes.OPERATION_NOT_PERMITTED:
          throw new OperationNotPermittedException();

        case ErrorCodes.COST_CENTER_NOT_FOUND:
          throw new CostCenterNotFoundException();

        case ErrorCodes.LECTURE_STOP_TIME_NOT_FOUND:
          throw new LectureStopTimeNotFoundException();

        case ErrorCodes.USER_LECTURE_NOTE_NOT_FOUND:
          throw new UserLectureNoteNotFoundException();

        case ErrorCodes.INVALID_EMAIL:
          throw new InvalidEmailException();

        default:
          throw exception;
      }
    } catch (error) {
      if (!(error instanceof HttpException)) {
        error = new InternalServerErrorException();
      }

      const statusCode = error.getStatus();

      if (gqlHost.getType() === 'http') {
        if (typeof error.getResponse() === 'object') {
          response.status(statusCode).json({
            ...error.getResponse(),
          });
        } else {
          response.status(statusCode).json({
            statusCode,
            message: error.getResponse(),
            error: exception.code || statusCode,
          });
        }
      } else {
        error.code = exception.code || statusCode;

        throw new HttpException(
          typeof error.response === 'object'
            ? error.response
            : {
                message: error.response,
                error: error.code,
                statusCode: error.status,
              },
          error.response.status || error.status,
        );
      }
    }
  }
}
